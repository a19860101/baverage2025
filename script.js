// script.js (全功能雲端版)
// ==========================================
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxgWxHIweOF21q3brCoKC8lzbHS4dqc0NLS6vvQtoNW6rxdlU58j4NfQaUdeNe_rC4ZoQ/exec"; 
// ==========================================

let db = { shops: [], menuItems: [], orders: [] };

document.addEventListener('DOMContentLoaded', () => {
    fetchCloudData(); 
});

// === 1. 讀取資料 (Read) ===
function fetchCloudData() {
    const tbody = document.getElementById('orderListBody');
    const menuBody = document.getElementById('menuDatabaseBody');
    const shopList = document.getElementById('shopListDisplay');

    // 顯示載入中
    if(db.orders.length === 0) tbody.innerHTML = `<tr><td colspan="8" class="text-center py-4 text-blue-500 font-bold animate-pulse">正在同步雲端資料庫...</td></tr>`;
    
    fetch(GOOGLE_SCRIPT_URL)
        .then(res => res.json())
        .then(data => {
            console.log("資料同步成功", data);
            db.orders = data.orders.reverse();
            db.shops = data.shops;
            db.menuItems = data.menuItems;
            
            refreshUI();
        })
        .catch(err => {
            console.error(err);
            tbody.innerHTML = `<tr><td colspan="8" class="text-center py-4 text-red-500">連線失敗</td></tr>`;
        });
}

function refreshUI() {
    renderShopLists();
    renderMenuTable();
    renderOrderList();
    // 如果使用者還沒選店家，才更新下拉選單，避免干擾
    if(document.getElementById('shopSelect').value === "") {
        updateMenuOptions();
    }
}

// === 2. 新增店家 (Create Shop) ===
function addShop() {
    const nameInput = document.getElementById('newShopName');
    const name = nameInput.value.trim();
    if (!name) return alert('請輸入店家名稱');

    const btn = document.querySelector('button[onclick="addShop()"]');
    btn.disabled = true;
    btn.textContent = "新增中...";

    fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({ action: "add_shop", name: name }),
        mode: "no-cors",
        headers: { "Content-Type": "application/json" }
    }).then(() => {
        alert(`店家「${name}」已新增至雲端！`);
        nameInput.value = '';
        btn.disabled = false;
        btn.textContent = "新增店家";
        fetchCloudData(); // 重新抓取資料
    });
}

// === 3. 新增品項 (Create Item) ===
function addMenuItem() {
    const shopId = document.getElementById('adminShopSelect').value;
    const name = document.getElementById('newItemName').value.trim();
    const size = document.getElementById('newItemSize').value;
    const price = document.getElementById('newItemPrice').value;

    if (!shopId || !name || !price) return alert('請填寫完整資料');

    const btn = document.querySelector('button[onclick="addMenuItem()"]');
    btn.disabled = true;
    btn.textContent = "新增中...";

    const itemData = {
        action: "add_item",
        shopId: shopId,
        name: name,
        size: size,
        price: price
    };

    fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(itemData),
        mode: "no-cors",
        headers: { "Content-Type": "application/json" }
    }).then(() => {
        alert(`品項「${name}」已新增至雲端！`);
        // 清空輸入框
        document.getElementById('newItemName').value = '';
        document.getElementById('newItemPrice').value = '';
        btn.disabled = false;
        btn.textContent = "新增品項至資料庫";
        fetchCloudData(); // 重新抓取
    });
}

// === 4. 刪除品項 (Delete Item) ===
function deleteItem(id) {
    if(!confirm('確定要從雲端刪除此品項嗎？\n(注意：這會直接刪除 Google 試算表上的資料)')) return;

    // 為了使用者體驗，先在前端移除該行 (視覺上)
    db.menuItems = db.menuItems.filter(item => item.id != id);
    refreshUI(); // 更新畫面

    fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({ action: "delete_item", id: id }),
        mode: "no-cors",
        headers: { "Content-Type": "application/json" }
    }).then(() => {
        console.log("刪除成功");
        fetchCloudData(); // 確保資料一致
    });
}

// === 5. 新增訂單 (Create Order) ===
function submitOrder() {
    const name = document.getElementById('customerName').value.trim();
    const shopSelect = document.getElementById('shopSelect');
    const itemSelect = document.getElementById('itemSelect');
    const sugar = document.getElementById('sugarSelect').value;
    const ice = document.getElementById('iceSelect').value;
    const note = document.getElementById('noteInput').value.trim();

    if (!name || !shopSelect.value || !itemSelect.value) return alert('請填寫完整資訊');

    const btn = document.querySelector('button[onclick="submitOrder()"]');
    btn.disabled = true;
    btn.textContent = "傳送中...";

    const selectedOption = itemSelect.options[itemSelect.selectedIndex];
    
    const orderData = {
        action: "add_order", // 明確指定動作
        name: name,
        shop: shopSelect.options[shopSelect.selectedIndex].text,
        item: selectedOption.dataset.name,
        size: selectedOption.dataset.size,
        price: selectedOption.dataset.price,
        sugar: sugar,
        ice: ice,
        note: note
    };

    fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(orderData),
        mode: "no-cors",
        headers: { "Content-Type": "application/json" }
    }).then(() => {
        alert('訂單已送出！');
        document.getElementById('noteInput').value = '';
        itemSelect.value = '';
        document.getElementById('sizeDisplay').value = '';
        btn.disabled = false;
        btn.textContent = "送出訂單";
        fetchCloudData();
    });
}

// === 6. 清空訂單 (Clear Orders) ===
function clearAllOrders() {
    if (!confirm("確定要清空 Google 試算表上的「所有」訂單嗎？無法復原！")) return;
    
    const btn = document.querySelector('button[onclick="clearAllOrders()"]');
    btn.disabled = true;
    btn.textContent = "刪除中...";

    fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({ action: "clear_orders" }),
        mode: "no-cors",
        headers: { "Content-Type": "application/json" }
    }).then(() => {
        alert("訂單已清空！");
        btn.disabled = false;
        btn.textContent = "清空所有訂單";
        fetchCloudData();
    });
}

// === UI 渲染函式 (與之前相同) ===
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
    
    const currentCustomerVal = customerSelect.value;
    const currentAdminVal = adminSelect.value;

    adminSelect.innerHTML = '';
    customerSelect.innerHTML = '<option value="">-- 請選擇店家 --</option>';
    shopListDisplay.innerHTML = '';

    db.shops.forEach(shop => {
        adminSelect.add(new Option(shop.name, shop.id));
        customerSelect.add(new Option(shop.name, shop.id));
        
        const li = document.createElement('li');
        li.textContent = shop.name;
        // 可以在這裡加一個刪除店家的按鈕 (選用)
        shopListDisplay.appendChild(li);
    });

    customerSelect.value = currentCustomerVal;
    if(currentAdminVal) adminSelect.value = currentAdminVal;
}

function renderMenuTable() {
    const tbody = document.getElementById('menuDatabaseBody');
    tbody.innerHTML = '';
    const sortedItems = [...db.menuItems].sort((a, b) => a.shopId - b.shopId);

    sortedItems.forEach(item => {
        const shop = db.shops.find(s => s.id == item.shopId);
        const tr = document.createElement('tr');
        tr.className = "bg-white border-b hover:bg-gray-50";
        tr.innerHTML = `
            <td class="px-4 py-2 text-gray-900">${shop ? shop.name : '未知'}</td>
            <td class="px-4 py-2">${item.name}</td>
            <td class="px-4 py-2"><span class="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">${item.size}</span></td>
            <td class="px-4 py-2">$${item.price}</td>
            <td class="px-4 py-2"><button onclick="deleteItem(${item.id})" class="text-red-500 text-xs hover:underline">刪除</button></td>
        `;
        tbody.appendChild(tr);
    });
}

function renderOrderList() {
    const tbody = document.getElementById('orderListBody');
    tbody.innerHTML = '';

    if (!db.orders || db.orders.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" class="px-6 py-4 text-center text-gray-500 text-sm">目前沒有訂單</td></tr>`;
        return;
    }

    db.orders.forEach((order) => {
        const tr = document.createElement('tr');
        tr.className = "hover:bg-gray-50";
        const noteDisplay = order.note ? `<span class="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">${order.note}</span>` : '-';

        tr.innerHTML = `
            <td class="px-4 py-3 text-sm font-medium text-gray-900">${order.customerName}<div class="text-xs text-gray-400 font-light">${formatTime(order.time)}</div></td>
            <td class="px-4 py-3 text-sm text-gray-500">${order.shopName}</td>
            <td class="px-4 py-3 text-sm text-gray-900">${order.itemName} <span class="bg-gray-200 text-gray-700 text-xs font-bold px-2 py-0.5 rounded ml-1">${order.size}</span></td>
            <td class="px-4 py-3 text-sm text-gray-600">${order.sugar}</td>
            <td class="px-4 py-3 text-sm text-gray-600">${order.ice}</td>
            <td class="px-4 py-3 text-sm font-bold text-blue-600">$${order.price}</td>
            <td class="px-4 py-3 text-sm">${noteDisplay}</td>
            <td class="px-4 py-3 text-sm">
                <button onclick="showModifyAlert()" class="text-xs text-red-500 border border-red-200 hover:bg-red-50 px-2 py-1 rounded transition">取消/修改</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
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
    const selected = itemSelect.options[itemSelect.selectedIndex];
    if(selected && selected.value) sizeDisplay.value = `${selected.dataset.size} / $${selected.dataset.price}`;
    else sizeDisplay.value = '';
}

function showModifyAlert() {
    alert('若訂錯飲料，請再訂購一次，並在備註註明"上一杯訂錯"');
}

function formatTime(timeStr) {
    if(!timeStr) return '';
    try {
        const d = new Date(timeStr);
        return d.getHours() + ':' + (d.getMinutes()<10?'0':'') + d.getMinutes();
    } catch(e) { return ''; }
}