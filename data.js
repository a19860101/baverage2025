// data.js
// 飲料資料庫：包含 50嵐, 可不可, 得正, 萬波 的熱銷品項
// 修改後，請在網頁後台點擊紅色按鈕「從檔案重置資料庫」以更新。

const initialData = {
    "shops": [
        { "id": 1, "name": "50嵐" },
        { "id": 2, "name": "可不可熟成紅茶" },
        { "id": 3, "name": "得正 OOLONG TEA" },
        { "id": 4, "name": "萬波島嶼紅茶" }
    ],
    "menuItems": [
        // ==========================================
        // 1. 50嵐 (價格參考北部/一般區)
        // ==========================================
        // --- 找好茶 ---
        { "id": 101, "shopId": 1, "name": "茉莉綠茶", "size": "M", "price": 30 },
        { "id": 102, "shopId": 1, "name": "茉莉綠茶", "size": "L", "price": 35 },
        { "id": 103, "shopId": 1, "name": "阿薩姆紅茶", "size": "M", "price": 30 },
        { "id": 104, "shopId": 1, "name": "阿薩姆紅茶", "size": "L", "price": 35 },
        { "id": 105, "shopId": 1, "name": "四季春青茶", "size": "M", "price": 30 },
        { "id": 106, "shopId": 1, "name": "四季春青茶", "size": "L", "price": 35 },
        { "id": 107, "shopId": 1, "name": "黃金烏龍", "size": "M", "price": 30 },
        { "id": 108, "shopId": 1, "name": "黃金烏龍", "size": "L", "price": 35 },
        // --- 找口感 ---
        { "id": 109, "shopId": 1, "name": "1號 (四季春+珍波椰)", "size": "M", "price": 45 },
        { "id": 110, "shopId": 1, "name": "1號 (四季春+珍波椰)", "size": "L", "price": 55 },
        { "id": 111, "shopId": 1, "name": "波霸/珍珠奶茶", "size": "M", "price": 45 },
        { "id": 112, "shopId": 1, "name": "波霸/珍珠奶茶", "size": "L", "price": 55 },
        { "id": 113, "shopId": 1, "name": "燕麥奶茶", "size": "M", "price": 45 },
        { "id": 114, "shopId": 1, "name": "燕麥奶茶", "size": "L", "price": 55 },
        { "id": 115, "shopId": 1, "name": "布丁奶茶", "size": "M", "price": 50 },
        { "id": 116, "shopId": 1, "name": "布丁奶茶", "size": "L", "price": 65 },
        // --- 找奶茶 ---
        { "id": 117, "shopId": 1, "name": "奶茶/奶綠", "size": "M", "price": 45 },
        { "id": 118, "shopId": 1, "name": "奶茶/奶綠", "size": "L", "price": 55 },
        { "id": 119, "shopId": 1, "name": "烏龍奶茶", "size": "M", "price": 45 },
        { "id": 120, "shopId": 1, "name": "烏龍奶茶", "size": "L", "price": 55 },
        // --- 找拿鐵 (鮮奶) ---
        { "id": 121, "shopId": 1, "name": "紅茶拿鐵", "size": "M", "price": 55 },
        { "id": 122, "shopId": 1, "name": "紅茶拿鐵", "size": "L", "price": 65 },
        { "id": 123, "shopId": 1, "name": "綠茶拿鐵", "size": "M", "price": 55 },
        { "id": 124, "shopId": 1, "name": "綠茶拿鐵", "size": "L", "price": 65 },
        // --- 找新鮮 ---
        { "id": 125, "shopId": 1, "name": "檸檬綠/青", "size": "M", "price": 40 },
        { "id": 126, "shopId": 1, "name": "檸檬綠/青", "size": "L", "price": 55 },
        { "id": 127, "shopId": 1, "name": "8冰綠", "size": "M", "price": 40 },
        { "id": 128, "shopId": 1, "name": "8冰綠", "size": "L", "price": 55 },
        { "id": 129, "shopId": 1, "name": "阿華田", "size": "M", "price": 50 },
        { "id": 130, "shopId": 1, "name": "阿華田", "size": "L", "price": 65 },

        // ==========================================
        // 2. 可不可熟成紅茶
        // ==========================================
        // --- 紅茶系列 ---
        { "id": 201, "shopId": 2, "name": "熟成紅茶", "size": "M", "price": 30 },
        { "id": 202, "shopId": 2, "name": "熟成紅茶", "size": "L", "price": 35 },
        { "id": 203, "shopId": 2, "name": "麗春紅茶", "size": "M", "price": 30 },
        { "id": 204, "shopId": 2, "name": "麗春紅茶", "size": "L", "price": 35 },
        { "id": 205, "shopId": 2, "name": "太妃紅茶", "size": "M", "price": 35 },
        { "id": 206, "shopId": 2, "name": "太妃紅茶", "size": "L", "price": 40 },
        // --- 冬瓜與綠茶 ---
        { "id": 207, "shopId": 2, "name": "春芽冷露", "size": "M", "price": 30 },
        { "id": 208, "shopId": 2, "name": "春芽冷露", "size": "L", "price": 35 },
        { "id": 209, "shopId": 2, "name": "春芽綠茶", "size": "M", "price": 30 },
        { "id": 210, "shopId": 2, "name": "春芽綠茶", "size": "L", "price": 35 },
        { "id": 211, "shopId": 2, "name": "冷露(冬瓜)", "size": "M", "price": 30 },
        { "id": 212, "shopId": 2, "name": "冷露(冬瓜)", "size": "L", "price": 35 },
        // --- 歐蕾 (鮮奶/奶茶) ---
        { "id": 213, "shopId": 2, "name": "熟成歐蕾", "size": "M", "price": 45 },
        { "id": 214, "shopId": 2, "name": "熟成歐蕾", "size": "L", "price": 55 },
        { "id": 215, "shopId": 2, "name": "白玉歐蕾", "size": "M", "price": 55 },
        { "id": 216, "shopId": 2, "name": "白玉歐蕾", "size": "L", "price": 65 },
        { "id": 217, "shopId": 2, "name": "冷露歐蕾", "size": "M", "price": 45 },
        { "id": 218, "shopId": 2, "name": "冷露歐蕾", "size": "L", "price": 55 },
        // --- 搭配 ---
        { "id": 219, "shopId": 2, "name": "雪藏紅茶 (冰淇淋)", "size": "M", "price": 50 },
        { "id": 220, "shopId": 2, "name": "雪藏紅茶 (冰淇淋)", "size": "L", "price": 60 },
        { "id": 221, "shopId": 2, "name": "熟成檸果", "size": "M", "price": 50 },

        // ==========================================
        // 3. 得正 OOLONG TEA
        // ==========================================
        // --- 烏龍原茶 ---
        { "id": 301, "shopId": 3, "name": "春烏龍 (四季春烏龍)", "size": "M", "price": 30 },
        { "id": 302, "shopId": 3, "name": "春烏龍 (四季春烏龍)", "size": "L", "price": 35 },
        { "id": 303, "shopId": 3, "name": "輕烏龍 (不發酵)", "size": "M", "price": 30 },
        { "id": 304, "shopId": 3, "name": "輕烏龍 (不發酵)", "size": "L", "price": 35 },
        { "id": 305, "shopId": 3, "name": "焙烏龍 (重烘焙)", "size": "M", "price": 30 },
        { "id": 306, "shopId": 3, "name": "焙烏龍 (重烘焙)", "size": "L", "price": 35 },
        // --- 芝士奶蓋 ---
        { "id": 307, "shopId": 3, "name": "芝士奶蓋春烏龍", "size": "M", "price": 50 },
        { "id": 308, "shopId": 3, "name": "芝士奶蓋春烏龍", "size": "L", "price": 55 },
        { "id": 309, "shopId": 3, "name": "芝士奶蓋焙烏龍", "size": "M", "price": 50 },
        { "id": 310, "shopId": 3, "name": "芝士奶蓋焙烏龍", "size": "L", "price": 55 },
        { "id": 311, "shopId": 3, "name": "芝士奶蓋抹茶", "size": "M", "price": 55 },
        { "id": 312, "shopId": 3, "name": "芝士奶蓋抹茶", "size": "L", "price": 65 },
        // --- 奶茶/鮮奶 ---
        { "id": 313, "shopId": 3, "name": "焙烏龍奶茶", "size": "M", "price": 40 },
        { "id": 314, "shopId": 3, "name": "焙烏龍奶茶", "size": "L", "price": 50 },
        { "id": 315, "shopId": 3, "name": "焙烏龍拿鐵 (鮮奶)", "size": "M", "price": 50 },
        { "id": 316, "shopId": 3, "name": "焙烏龍拿鐵 (鮮奶)", "size": "L", "price": 60 },
        // --- 水果 ---
        { "id": 317, "shopId": 3, "name": "檸檬春烏龍", "size": "M", "price": 45 },
        { "id": 318, "shopId": 3, "name": "檸檬春烏龍", "size": "L", "price": 55 },
        { "id": 319, "shopId": 3, "name": "甘蔗春烏龍", "size": "M", "price": 50 },
        { "id": 320, "shopId": 3, "name": "甘蔗春烏龍", "size": "L", "price": 60 },

        // ==========================================
        // 4. 萬波島嶼紅茶
        // ==========================================
        // --- 原茶 ---
        { "id": 401, "shopId": 4, "name": "島嶼紅茶", "size": "M", "price": 30 },
        { "id": 402, "shopId": 4, "name": "島嶼紅茶", "size": "L", "price": 35 },
        { "id": 403, "shopId": 4, "name": "宣橋綠茶", "size": "M", "price": 30 },
        { "id": 404, "shopId": 4, "name": "宣橋綠茶", "size": "L", "price": 35 },
        { "id": 405, "shopId": 4, "name": "阿里山烏龍", "size": "M", "price": 30 },
        { "id": 406, "shopId": 4, "name": "阿里山烏龍", "size": "L", "price": 35 },
        // --- 奶茶/那堤 ---
        { "id": 407, "shopId": 4, "name": "萬波奶茶", "size": "M", "price": 40 },
        { "id": 408, "shopId": 4, "name": "萬波奶茶", "size": "L", "price": 50 },
        { "id": 409, "shopId": 4, "name": "蘭葉那堤", "size": "M", "price": 55 },
        { "id": 410, "shopId": 4, "name": "蘭葉那堤", "size": "L", "price": 65 },
        // --- 口感/特調 ---
        { "id": 411, "shopId": 4, "name": "紅豆粉粿鮮奶", "size": "M", "price": 65 },
        { "id": 412, "shopId": 4, "name": "黑糖珍珠鮮奶", "size": "M", "price": 60 },
        { "id": 413, "shopId": 4, "name": "金桔檸檬", "size": "M", "price": 50 },
        { "id": 414, "shopId": 4, "name": "金桔檸檬", "size": "L", "price": 60 },
        { "id": 415, "shopId": 4, "name": "埔里甘蔗青", "size": "M", "price": 45 },
        { "id": 416, "shopId": 4, "name": "埔里甘蔗青", "size": "L", "price": 55 }
    ],
    "orders": []
};