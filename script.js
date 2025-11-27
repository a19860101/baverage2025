// script.js
// ==========================================
// 請填入你的 Google Apps Script 網址
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwMHAYJqYOe1vBL1Gx1a4ox9-lpc1JbHyFDZGAVULD4CYo-Zrwsl-3zhV87CBAX-gUIFw/exec"; 
// ==========================================

const DB_KEY = 'drink_system_db_v2';
let db = { shops: [], menuItems: [], orders: [] };

document.addEventListener('DOMContentLoaded', () => {
    loadLocalData(); 
    refreshUI();
    fetchCloudOrders(); 
});

// ... (loadLocalData, saveData, resetDataFromFile 不變) ...
function loadLocalData() {
    const savedData = localStorage.getItem(DB_KEY);
    if (savedData) {
        let localDB = JSON.parse(savedData);
        db.shops = localDB.shops || [];
        db.menuItems = localDB.menuItems || [];
    } else {
        resetDataFromFile(false);
    }
}

function saveData() {
    const dataToSave = {
        shops: db.shops,
        menuItems: db.menuItems
    };
    localStorage.setItem(DB_KEY, JSON.stringify(dataToSave));
}

function resetDataFromFile(alertUser = true) {
    if (typeof initialData === 'undefined') {
        alert('找不到 data.js 檔案！');
        return;
    }
    db.shops = JSON.parse(JSON.stringify(initialData.shops));
    db.menuItems = JSON.parse(JSON.stringify(initialData.menuItems));
    saveData();
    refreshUI();
    if (alertUser) alert('菜單資料庫已更新！');
}

// === 核心功能：從 Google 抓取訂單 ===
function fetchCloudOrders() {
    const tbody = document.getElementById('orderListBody');
    // colspan 改成 8
    tbody.innerHTML = `<tr><td colspan="8" class="px-6 py-4 text-center text-blue-500 font-bold animate-pulse">正在同步雲端訂單...</td></tr>`;

    fetch(GOOGLE_SCRIPT_URL)
        .then(response => response.json())
        .then(data => {
            db.orders = data.reverse(); 
            renderOrderList();
        })
        .catch(err => {
            console.error(err);
            tbody.innerHTML = `<tr><td colspan="8" class="px-6 py-4 text-center text-red-500">無法載入訂單，請檢查網路。</td></tr>`;
        });
}

function refreshUI() {
    renderShopLists();
    renderMenuTable();
    renderOrderList();
    updateMenuOptions();
}

function switchTab(tabName) {
    document.getElementById('view-order').classList.add('hidden');
    document.getElementById('view-admin').classList.add('hidden');
    document.getElementById('tab-order').classList.remove('active');
    document.getElementById('tab-admin').classList.remove('active');
    document.getElementById('view-' + tabName).classList.remove('hidden');
    document.getElementById('tab-' + tabName).classList.add('active');
}

function renderShopLists() {
    const adminSelect = document.getElementById('adminShopSelect');
    const customerSelect = document.getElementById('shopSelect');
    const shopListDisplay = document.getElementById('shopListDisplay');
    const currentVal = customerSelect.value;

    adminSelect.innerHTML = '';
    customerSelect.innerHTML = '<option value="">-- 請選擇店家 --</option>';
    shopListDisplay.innerHTML = '';

    db.shops.forEach(shop => {
        adminSelect.add(new Option(shop.name, shop.id));
        customerSelect.add(new Option(shop.name, shop.id));
        const li = document.createElement('li');
        li.textContent = shop.name;
        shopListDisplay.appendChild(li);
    });
    customerSelect.value = currentVal;
}

function renderMenuTable() {
    const tbody = document.getElementById('menuDatabaseBody');
    tbody.innerHTML = '';
    const sortedItems = [...db.menuItems].sort((a, b) => {
        if (a.shopId !== b.shopId) return a.shopId - b.shopId;
        return a.price - b.price;
    });

    sortedItems.forEach(item => {
        const shop = db.shops.find(s => s.id == item.shopId);
        const tr = document.createElement('tr');
        tr.className = "bg-white border-b hover:bg-gray-50";
        tr.innerHTML = `
            <td class="px-4 py-2 font-medium text-gray-900">${shop ? shop.name : '未知'}</td>
            <td class="px-4 py-2">${item.name}</td>
            <td class="px-4 py-2"><span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded">${item.size}</span></td>
            <td class="px-4 py-2">$${item.price}</td>
            <td class="px-4 py-2"><button onclick="deleteItem(${item.id})" class="text-red-500 text-xs">刪除</button></td>
        `;
        tbody.appendChild(tr);
    });
}

// === 修改：訂單列表渲染邏輯 ===
function renderOrderList() {
    const tbody = document.getElementById('orderListBody');
    tbody.innerHTML = '';

    if (!db.orders || db.orders.length === 0) {
        // colspan 改成 8
        tbody.innerHTML = `<tr><td colspan="8" class="px-6 py-4 text-center text-gray-500 text-sm">目前沒有訂單</td></tr>`;
        return;
    }

    db.orders.forEach((order) => {
        const tr = document.createElement('tr');
        tr.className = "hover:bg-gray-50";
        
        const note = order.note ? order.note : '';
        const noteDisplay = note ? `<span class="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">${note}</span>` : '-';

        tr.innerHTML = `
            <td class="px-4 py-3 text-sm font-medium text-gray-900">
                ${order.customerName}
                <div class="text-xs text-gray-400 font-light">${formatTime(order.time)}</div>
            </td>
            <td class="px-4 py-3 text-sm text-gray-500">${order.shopName}</td>
            <td class="px-4 py-3 text-sm text-gray-900">
                ${order.itemName} <span class="bg-gray-200 text-gray-700 text-xs font-bold px-2 py-0.5 rounded ml-1">${order.size}</span>
            </td>
            <td class="px-4 py-3 text-sm text-gray-600">${order.sugar}</td>
            <td class="px-4 py-3 text-sm text-gray-600">${order.ice}</td>
            <td class="px-4 py-3 text-sm font-bold text-blue-600">$${order.price}</td>
            <td class="px-4 py-3 text-sm">${noteDisplay}</td>
            <td class="px-4 py-3 text-sm">
                <button onclick="showModifyAlert()" class="text-xs text-red-500 border border-red-200 hover:bg-red-50 px-2 py-1 rounded transition">
                    取消/修改
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function formatTime(timeStr) {
    if(!timeStr) return '';
    try {
        const d = new Date(timeStr);
        return d.getHours() + ':' + (d.getMinutes()<10?'0':'') + d.getMinutes();
    } catch(e) { return ''; }
}

function updateMenuOptions() {
    const shopId = document.getElementById('shopSelect').value;
    const itemSelect = document.getElementById('itemSelect');
    const sizeDisplay = document.getElementById('sizeDisplay');
    
    itemSelect.innerHTML = '<option value="">-- 請選擇品項 --</option>';
    sizeDisplay.value = '';
    if (!shopId) return;

    const filteredItems = db.menuItems.filter(item => item.shopId == shopId);
    if (filteredItems.length === 0) {
        itemSelect.innerHTML = '<option value="">該店家尚無品項</option>';
        return;
    }
    filteredItems.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = `${item.name} (${item.size}) - $${item.price}`;
        option.dataset.price = item.price;
        option.dataset.size = item.size;
        option.dataset.name = item.name;
        itemSelect.appendChild(option);
    });
}

function updateSizeDisplay() {
    const itemSelect = document.getElementById('itemSelect');
    const sizeDisplay = document.getElementById('sizeDisplay');
    const selectedOption = itemSelect.options[itemSelect.selectedIndex];
    if (selectedOption && selectedOption.value) {
        sizeDisplay.value = `${selectedOption.dataset.size} / $${selectedOption.dataset.price}`;
    } else {
        sizeDisplay.value = '';
    }
}

// === 修改：送出訂單邏輯 ===
function submitOrder() {
    const name = document.getElementById('customerName').value.trim();
    const shopSelect = document.getElementById('shopSelect');
    const itemSelect = document.getElementById('itemSelect');
    const sugar = document.getElementById('sugarSelect').value;
    const ice = document.getElementById('iceSelect').value;
    // 抓取備註
    const note = document.getElementById('noteInput').value.trim();

    if (!name || !shopSelect.value || !itemSelect.value) {
        alert('請填寫完整訂單資訊');
        return;
    }

    const selectedOption = itemSelect.options[itemSelect.selectedIndex];
    const shopName = shopSelect.options[shopSelect.selectedIndex].text;
    const btn = document.querySelector('button[onclick="submitOrder()"]');

    btn.disabled = true;
    btn.textContent = "傳送中...";

    const orderData = {
        name: name,
        shop: shopName,
        item: selectedOption.dataset.name,
        size: selectedOption.dataset.size,
        price: selectedOption.dataset.price,
        sugar: sugar,
        ice: ice,
        note: note // 新增傳送備註
    };

    fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(orderData),
        mode: "no-cors",
        headers: { "Content-Type": "application/json" }
    })
    .then(() => {
        alert('訂單已送出！');
        fetchCloudOrders(); 

        itemSelect.value = '';
        document.getElementById('sizeDisplay').value = '';
        document.getElementById('noteInput').value = ''; // 清空備註欄
        btn.disabled = false;
        btn.textContent = "送出訂單";
    })
    .catch(err => {
        console.error(err);
        alert("訂單傳送失敗");
        btn.disabled = false;
        btn.textContent = "送出訂單";
    });
}

function addShop() {
    const name = document.getElementById('newShopName').value.trim();
    if (!name) return alert('請輸入店家名稱');
    const newId = db.shops.length > 0 ? Math.max(...db.shops.map(s => s.id)) + 1 : 1;
    db.shops.push({ id: newId, name: name });
    saveData();
    document.getElementById('newShopName').value = '';
    refreshUI();
}

function addMenuItem() {
    const shopId = document.getElementById('adminShopSelect').value;
    const name = document.getElementById('newItemName').value.trim();
    const size = document.getElementById('newItemSize').value;
    const price = document.getElementById('newItemPrice').value;
    if (!shopId || !name || !price) return alert('請填寫完整資料');
    
    const newItem = {
        id: Date.now(),
        shopId: parseInt(shopId),
        name: name,
        size: size,
        price: parseInt(price)
    };
    db.menuItems.push(newItem);
    saveData();
    document.getElementById('newItemName').value = '';
    document.getElementById('newItemPrice').value = '';
    refreshUI();
}

function deleteItem(id) {
    if(!confirm('確定刪除此品項？')) return;
    db.menuItems = db.menuItems.filter(item => item.id !== id);
    saveData();
    refreshUI();
}

// 3. 新增提示視窗函式 (加在 script.js 最後面即可)
function showModifyAlert() {
    alert('若訂錯飲料，請再訂購一次，並在備註註明"上一杯訂錯"');
}

// === 新增：清空所有訂單 ===
function clearAllOrders() {
    // 1. 二次確認防止誤按
    if (!confirm("【警告】\n\n您確定要清空 Google 試算表上的「所有」訂單嗎？\n此動作無法復原！")) {
        return;
    }

    // 2. 鎖定按鈕顯示狀態
    // 這裡我們簡單抓取觸發事件的按鈕，如果需要更精確可以用 id
    const btn = document.querySelector('button[onclick="clearAllOrders()"]');
    if(btn) {
        btn.disabled = true;
        btn.textContent = "刪除中...";
    }

    // 3. 發送請求給 Google Apps Script
    fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({ action: "clear" }), // 告訴後端這是 clear 動作
        mode: "no-cors",
        headers: { "Content-Type": "application/json" }
    })
    .then(() => {
        alert("訂單已全部清空！");
        
        // 4. 重整列表
        fetchCloudOrders(); 
        
        // 5. 恢復按鈕
        if(btn) {
            btn.disabled = false;
            btn.textContent = "清空所有訂單";
        }
    })
    .catch(err => {
        console.error(err);
        alert("清空失敗，請檢查網路連線。");
        if(btn) {
            btn.disabled = false;
            btn.textContent = "清空所有訂單";
        }
    });
}