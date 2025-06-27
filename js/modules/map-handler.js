let map;
let userMarker;
let parkingMarkers = [];
let currentInfoWindow = null;

// 初始化地圖
const initializeMap = (googleMapsApiKey) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`;
        script.defer = true;
        script.async = true;
        script.onload = () => {
            try {
                map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 15,
                    center: { lat: 25.0330, lng: 121.5654 }, // 台北市中心
                    mapTypeControl: false,
                    fullscreenControl: false,
                    streetViewControl: false
                });
                resolve(map);
            } catch (error) {
                reject(error);
            }
        };
        script.onerror = () => reject(new Error('Google Maps 載入失敗'));
        document.head.appendChild(script);
    });
};

// 更新使用者位置
const updateUserLocation = (position) => {
    const userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };

    if (!userMarker) {
        userMarker = new google.maps.Marker({
            position: userLocation,
            map: map,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#4285F4',
                fillOpacity: 1,
                strokeColor: 'white',
                strokeWeight: 2,
            },
            title: '您的位置'
        });
    } else {
        userMarker.setPosition(userLocation);
    }

    map.setCenter(userLocation);
    return userLocation;
};

// 清除所有停車場標記
const clearParkingMarkers = () => {
    parkingMarkers.forEach(marker => marker.setMap(null));
    parkingMarkers = [];
    if (currentInfoWindow) {
        currentInfoWindow.close();
        currentInfoWindow = null;
    }
};

// 添加停車場標記
const addParkingMarker = (parkingLot, onClick) => {
    if (!parkingLot.EntranceCoord?.EntrancecoordInfo?.[0]) return;

    const position = {
        lat: parseFloat(parkingLot.EntranceCoord.EntrancecoordInfo[0].Ycod),
        lng: parseFloat(parkingLot.EntranceCoord.EntrancecoordInfo[0].Xcod)
    };

    const marker = new google.maps.Marker({
        position: position,
        map: map,
        title: parkingLot.name,
        icon: {
            url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjRTYwMDBCIiBkPSJNMTMgM2MtNC45NyAwLTkgNC4wMy05IDlIMWw0IDQgNCA0aDN2LTJoLTRsLTQtNGgyLjVjMC00LjM0IDMuMTYtNy41IDcuNS03LjVzNy41IDMuMTYgNy41IDcuNWMwIDQuMzQtMy4xNiA3LjUtNy41IDcuNWMtMS42MSAwLTMuMDktLjU5LTQuMjMtMS41N2wtMS40MyAxLjQzQzEwLjQ3IDIwLjg4IDEyLjI4IDIyIDEzIDIyYzQuOTcgMCA5LTQuMDMgOS05cy00LjAzLTktOS05em0yIDloLTR2Nmg0di02em0wLTR2Mkg5djJoNnYtMnoiLz48L3N2Zz4=',
            scaledSize: new google.maps.Size(32, 32)
        }
    });

    marker.addListener('click', () => onClick(parkingLot, marker));
    parkingMarkers.push(marker);
    return marker;
};

// 創建資訊視窗內容
const createInfoWindowContent = (parkingLot) => {
    const status = parkingLot.availableSpaces > 0 ? '尚有空位' : '已滿';
    const statusClass = parkingLot.availableSpaces > 0 ? 'available' : 'full';

    return `
        <div class="info-window">
            <div class="info-window-header">
                <h3>${parkingLot.name}</h3>
            </div>
            <p>地址：${parkingLot.address}</p>
            <p>總車位：${parkingLot.totalcar} 個</p>
            <p>剩餘車位：<span class="${statusClass}">${parkingLot.availableSpaces}</span></p>
            <p>收費：${parkingLot.payex || '無資料'}</p>
            <p>營業時間：${parkingLot.serviceTime || '24小時'}</p>
            <button class="navigation-button" onclick="startNavigation(${parkingLot.EntranceCoord.EntrancecoordInfo[0].Ycod}, ${parkingLot.EntranceCoord.EntrancecoordInfo[0].Xcod}, '${parkingLot.name}')">
                <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0Ij48cGF0aCBkPSJNMjEuNzEgMTEuMjlsLTktOS4wMWMtLjM5LS4zOS0xLjAyLS4zOS0xLjQxIDBsLTkgOS4wMWMtLjM5LjM5LS4zOSAxLjAyIDAgMS40MWw5IDkuMDFjLjM5LjM5IDEuMDIuMzkgMS40MSAwbDktOS4wMWMuMzktLjM5LjM5LTEuMDIgMC0xLjQxek0xNCAxNC41VjEyaC00djNINy41bDQuNSA0LjUgNC41LTQuNUgxNHoiIGZpbGw9IndoaXRlIi8+PC9zdmc+" alt="導航圖標">
                導航
            </button>
        </div>
    `;
};

// 顯示資訊視窗
const showInfoWindow = (parkingLot, marker) => {
    if (currentInfoWindow) {
        currentInfoWindow.close();
    }

    const infoWindow = new google.maps.InfoWindow({
        content: createInfoWindowContent(parkingLot)
    });

    infoWindow.open(map, marker);
    currentInfoWindow = infoWindow;
};

export {
    initializeMap,
    updateUserLocation,
    clearParkingMarkers,
    addParkingMarker,
    showInfoWindow
}; 