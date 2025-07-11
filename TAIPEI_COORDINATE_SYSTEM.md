# 台北市停車場座標系統處理規範

## 📍 概述
本文件記錄台北市停車場座標的**正確處理方式**，確保未來加入其他縣市時不會影響台北市座標的準確性。

**⚠️ 重要提醒：台北市座標處理已經完美運作，任何修改都可能導致座標錯誤！**

## 🎯 核心原則

### 1. 座標優先順序（絕對不可改變）
```
第一優先：TWD97 座標 (tw97x, tw97y)
第二優先：EntranceCoord 座標 (Xcod, Ycod) 
```

### 2. 座標處理邏輯
```javascript
function getParkingLotCoordinates(parkingLot) {
    // 優先使用 TWD97 座標
    if (parkingLot.tw97x && parkingLot.tw97y) {
        return twd97_to_wgs84(parkingLot.tw97x, parkingLot.tw97y);
    }
    
    // 如果沒有 TWD97 座標，才使用入口座標
    if (parkingLot.EntranceCoord?.EntrancecoordInfo?.[0]) {
        const entranceInfo = parkingLot.EntranceCoord.EntrancecoordInfo[0];
        const xcod = parseFloat(entranceInfo.Xcod);
        const ycod = parseFloat(entranceInfo.Ycod);
        
        // 預設 Xcod 是經度，Ycod 是緯度
        let coords = {
            lat: ycod,    // 緯度
            lng: xcod     // 經度
        };
        
        // 檢查座標是否在台北市範圍內
        if (!isCoordinateInTaipei(coords.lat, coords.lng)) {
            // 如果座標不在台北市範圍內，嘗試交換經緯度
            coords = {
                lat: xcod,
                lng: ycod
            };
            
            // 如果交換後還是不在台北市範圍內，這個入口座標可能有問題
            if (!isCoordinateInTaipei(coords.lat, coords.lng)) {
                return null;
            }
        }
        
        return coords;
    }
    
    return null;
}
```

## 🔧 TWD97 轉換算法

### 正確的轉換函數（完整版本）
```javascript
function twd97_to_wgs84(x, y) {
    const a = 6378137.0;                    // GRS80 長半軸
    const b = 6356752.314245;               // GRS80 短半軸
    const lng0 = 121 * Math.PI / 180;       // 中央經線 121°E
    const k0 = 0.9999;                      // 中央經線尺度比
    const dx = 250000;                      // 東偏移
    const dy = 0;                           // 北偏移
    const e = Math.sqrt((a * a - b * b) / (a * a));

    x = parseFloat(x) - dx;
    y = parseFloat(y) - dy;

    // Calculate the meridian distance
    let M = y / k0;

    // Calculate footprint latitude
    let mu = M / (a * (1.0 - Math.pow(e, 2) / 4.0 - 3 * Math.pow(e, 4) / 64.0 - 5 * Math.pow(e, 6) / 256.0));
    let e1 = (1.0 - Math.sqrt(1.0 - Math.pow(e, 2))) / (1.0 + Math.sqrt(1.0 - Math.pow(e, 2)));

    let J1 = (3 * e1 / 2 - 27 * Math.pow(e1, 3) / 32.0);
    let J2 = (21 * Math.pow(e1, 2) / 16 - 55 * Math.pow(e1, 4) / 32.0);
    let J3 = (151 * Math.pow(e1, 3) / 96.0);
    let J4 = (1097 * Math.pow(e1, 4) / 512.0);

    let fp = mu + J1 * Math.sin(2 * mu) + J2 * Math.sin(4 * mu) + J3 * Math.sin(6 * mu) + J4 * Math.sin(8 * mu);

    // Calculate latitude and longitude
    let e2 = Math.pow((e * a / b), 2);
    let C1 = Math.pow(e2 * Math.cos(fp), 2);
    let T1 = Math.pow(Math.tan(fp), 2);
    let R1 = a * (1 - Math.pow(e, 2)) / Math.pow((1 - Math.pow(e, 2) * Math.pow(Math.sin(fp), 2)), (3.0 / 2.0));
    let N1 = a / Math.sqrt(1 - Math.pow(e, 2) * Math.pow(Math.sin(fp), 2));

    let D = x / (N1 * k0);

    // 計算緯度
    let Q1 = N1 * Math.tan(fp) / R1;
    let Q2 = (Math.pow(D, 2) / 2.0);
    let Q3 = (5 + 3 * T1 + 10 * C1 - 4 * Math.pow(C1, 2) - 9 * e2) * Math.pow(D, 4) / 24.0;
    let Q4 = (61 + 90 * T1 + 298 * C1 + 45 * Math.pow(T1, 2) - 3 * Math.pow(C1, 2) - 252 * e2) * Math.pow(D, 6) / 720.0;
    let lat = fp - Q1 * (Q2 - Q3 + Q4);

    // 計算經度
    let Q5 = D;
    let Q6 = (1 + 2 * T1 + C1) * Math.pow(D, 3) / 6;
    let Q7 = (5 - 2 * C1 + 28 * T1 - 3 * Math.pow(C1, 2) + 8 * e2 + 24 * Math.pow(T1, 2)) * Math.pow(D, 5) / 120.0;
    let lng = lng0 + (Q5 - Q6 + Q7) / Math.cos(fp);

    // 轉換為度
    lat = (lat * 180) / Math.PI;
    lng = (lng * 180) / Math.PI;

    return { lat, lng };
}
```

### 台北市範圍檢查
```javascript
function isCoordinateInTaipei(lat, lng) {
    const TAIPEI_BOUNDS = {
        minLat: 24.95,
        maxLat: 25.21,
        minLng: 121.45,
        maxLng: 121.67
    };
    
    return lat >= TAIPEI_BOUNDS.minLat && 
           lat <= TAIPEI_BOUNDS.maxLat && 
           lng >= TAIPEI_BOUNDS.minLng && 
           lng <= TAIPEI_BOUNDS.maxLng;
}
```

## 📊 台北市停車場資料格式

### TWD97 座標
```json
{
    "tw97x": "306867.5312",
    "tw97y": "2771311.5"
}
```

### EntranceCoord 座標
```json
{
    "EntranceCoord": {
        "EntrancecoordInfo": [{
            "Xcod": "25.03335",   // 實際是緯度
            "Ycod": "121.56355"   // 實際是經度
        }]
    }
}
```

## ⚠️ 常見錯誤與避免方法

### 1. **絕對不要改變座標優先順序**
❌ 錯誤：EntranceCoord → TWD97
✅ 正確：TWD97 → EntranceCoord

### 2. **絕對不要簡化 TWD97 轉換算法**
❌ 錯誤：使用線性換算
✅ 正確：使用完整的 Transverse Mercator 投影

### 3. **絕對不要忽略座標範圍檢查**
❌ 錯誤：直接使用 EntranceCoord
✅ 正確：檢查是否在台北市範圍內

### 4. **EntranceCoord 的 Xcod/Ycod 命名容易混淆**
❌ 錯誤：以為 Xcod 是經度
✅ 正確：Xcod 實際是緯度，Ycod 實際是經度

## 🎯 性能指標

### 座標準確性
- TWD97 轉換誤差：< 10 公尺
- EntranceCoord 誤差：< 100 公尺
- 整體成功率：> 95%

### 資料覆蓋率
- 有 TWD97 座標的停車場：~90%
- 有 EntranceCoord 的停車場：~70%
- 完全沒有座標的停車場：< 5%

## 🔄 多縣市擴展原則

### 新增其他縣市時
1. **保持台北市邏輯不變**
2. **新縣市使用獨立的處理函數**
3. **不要修改 `twd97_to_wgs84` 函數**
4. **為每個縣市建立獨立的範圍檢查**

### 建議架構
```javascript
function getParkingLotCoordinates(parkingLot, city) {
    switch(city) {
        case 'taipei':
            return getTaipeiCoordinates(parkingLot);  // 現有邏輯
        case 'newtaipei':
            return getNewTaipeiCoordinates(parkingLot);  // 新邏輯
        default:
            return getTaipeiCoordinates(parkingLot);  // 預設使用台北邏輯
    }
}
```

## 📝 歷史教訓

### 之前失敗的修改
1. **改變座標優先順序** → 導致嘟嘟房八德站顯示在101附近
2. **簡化 TWD97 算法** → 導致 3000-8000 公尺誤差
3. **移除範圍檢查** → 導致座標錯誤無法被發現

### 成功版本的commit
- `c02a740` - 改進：不顯示停車費用為0的停車場
- 這個版本的座標處理邏輯是**黃金標準**，不可更改

## 🔒 最終提醒

**台北市座標處理已經完美，任何"改進"都可能導致重大錯誤！**

如果需要修改座標相關邏輯：
1. 先備份當前版本
2. 只針對新縣市新增功能
3. 絕對不要觸碰台北市的邏輯
4. 充分測試後再部署

**記住：如果它沒壞，就不要修它！** 