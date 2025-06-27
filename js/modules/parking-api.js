// API 端點
const API_ENDPOINTS = {
    AVAILABLE: 'https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_allavailable.json',
    DESCRIPTION: 'https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_alldesc.json'
};

// 獲取所有停車場描述資訊
const getParkingLotDescriptions = async () => {
    try {
        const response = await fetch(API_ENDPOINTS.DESCRIPTION);
        const data = await response.json();
        return data.data.park;
    } catch (error) {
        console.error('獲取停車場描述失敗:', error);
        return [];
    }
};

// 獲取即時車位資訊
const getParkingLotAvailability = async () => {
    try {
        const response = await fetch(API_ENDPOINTS.AVAILABLE);
        const data = await response.json();
        return data.data.park;
    } catch (error) {
        console.error('獲取即時車位資訊失敗:', error);
        return [];
    }
};

// 合併停車場資訊
const getMergedParkingData = async () => {
    const [descriptions, availability] = await Promise.all([
        getParkingLotDescriptions(),
        getParkingLotAvailability()
    ]);

    return descriptions.map(desc => {
        const availData = availability.find(avail => avail.id === desc.id);
        return {
            ...desc,
            availableSpaces: availData ? availData.availablecar : -9
        };
    });
};

// 根據位置獲取附近停車場
const getNearbyParkingLots = (parkingLots, userLat, userLng, radius = 1000) => {
    return parkingLots.filter(lot => {
        if (!lot.EntranceCoord?.EntrancecoordInfo?.[0]) return false;
        
        const lotLat = parseFloat(lot.EntranceCoord.EntrancecoordInfo[0].Ycod);
        const lotLng = parseFloat(lot.EntranceCoord.EntrancecoordInfo[0].Xcod);
        
        const distance = getDistance(userLat, userLng, lotLat, lotLng);
        return distance <= radius;
    });
};

// 計算兩點間距離（使用 Haversine 公式）
const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // 地球半徑（公尺）
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
};

export {
    getMergedParkingData,
    getNearbyParkingLots
}; 