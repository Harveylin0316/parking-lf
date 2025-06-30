# 台北停車場地圖 - LIFF 版本

這是台北停車場地圖的 LINE LIFF (LINE Front-end Framework) 版本，可以在 LINE 應用程式中使用。

## 功能特色

### LIFF 專用功能
- ✅ 整合 LINE LIFF SDK
- ✅ 在 LINE 內建瀏覽器中運行
- ✅ 支援用戶身份驗證（可選）
- ✅ 原生分享功能
- ✅ 優化的觸控體驗
- ✅ 適配 LINE 環境的 UI

### 核心功能
- 🚗 即時停車位資訊顯示
- 📍 GPS 定位服務
- 🔍 地點搜尋功能
- 🗺️ 互動式地圖
- 📱 響應式設計
- 🔄 自動更新（每3分鐘）

## 設置步驟

### 1. 準備 LIFF 應用程式

1. 登入 [LINE Developers Console](https://developers.line.biz/)
2. 創建新的 Provider 或使用現有的
3. 創建新的 LIFF 應用程式：
   - App type: `Web app`
   - Size: `Full`
   - Endpoint URL: 您的部署網址（例如：`https://your-app.netlify.app`）
   - Scope: 根據需求選擇（建議至少選擇 `profile`）

### 2. 配置 LIFF ID

編輯 `liff.config.js` 文件：

```javascript
const liffConfig = {
    // 開發環境 LIFF ID
    development: {
        liffId: 'YOUR_DEVELOPMENT_LIFF_ID', // 替換為開發環境的 LIFF ID
    },
    
    // 生產環境 LIFF ID
    production: {
        liffId: 'YOUR_PRODUCTION_LIFF_ID', // 替換為生產環境的 LIFF ID
    },
    
    // 其他配置...
};
```

### 3. 部署應用程式

1. 將程式碼推送到您的 git repository
2. 在 Netlify 上部署（或其他支持 HTTPS 的平台）
3. 確保部署的網址與 LIFF 設定中的 Endpoint URL 一致

### 4. 測試 LIFF 應用程式

1. 在 LINE Developers Console 中，找到您的 LIFF 應用程式
2. 複製 LIFF URL：`https://liff.line.me/{LIFF_ID}`
3. 在 LINE 應用程式中開啟該 URL
4. 或將 LIFF URL 分享給好友進行測試

## 環境差異

### LIFF 環境 vs 一般瀏覽器

| 功能 | LIFF 環境 | 一般瀏覽器 |
|------|-----------|------------|
| 地圖顯示 | ✅ | ✅ |
| 停車場資訊 | ✅ | ✅ |
| 位置服務 | ✅ | ✅ |
| 搜尋功能 | ✅ | ✅ |
| 導航功能 | ✅ (外部瀏覽器) | ✅ |
| 分享功能 | ✅ (原生 LINE 分享) | ❌ |
| 用戶識別 | ✅ (LINE 用戶) | ❌ |

## 開發注意事項

### LIFF 限制
- 必須在 HTTPS 環境下運行
- 某些瀏覽器 API 可能受限
- 需要在 LINE 應用程式中才能使用完整功能

### 測試建議
1. **本地開發**：使用 ngrok 等工具建立 HTTPS tunnel
2. **除錯**：使用 LINE 應用程式內建的開發者工具
3. **多設備測試**：在不同的行動裝置上測試

### 程式碼結構

```
parking-lf/
├── index.html          # 主要 HTML 文件（包含 LIFF 整合）
├── style.css           # 樣式文件（包含 LIFF 特定樣式）
├── liff.config.js      # LIFF 配置文件
├── LIFF_README.md      # LIFF 版本說明文件
├── netlify/
│   └── functions/
│       └── get-maps-key.js  # Google Maps API Key 函數
└── ...
```

## API 整合

### Google Maps API
- 使用與主版本相同的 Google Maps 整合
- 透過 Netlify Functions 安全地管理 API Key

### 台北市停車場 API
- 即時停車位資訊：`https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_allavailable.json`
- 停車場基本資訊：內建的 JSON 資料

## 故障排除

### 常見問題

1. **LIFF 初始化失敗**
   - 檢查 LIFF ID 是否正確
   - 確認網址與 LIFF 設定一致
   - 檢查是否在 LINE 應用程式中開啟

2. **地圖無法載入**
   - 檢查 Google Maps API Key 是否有效
   - 確認網路連線狀態

3. **分享功能無效**
   - 確認在 LIFF 環境中（不是外部瀏覽器）
   - 檢查 LIFF 權限設定

4. **位置服務無法使用**
   - 檢查位置權限是否已授予
   - 確認在 HTTPS 環境下運行

### 除錯方法

1. 開啟瀏覽器開發者工具
2. 查看 Console 輸出
3. 檢查網路請求是否成功
4. 使用 LIFF Inspector：`https://liff.line.me/{LIFF_ID}?liff.debug=true`

## 更新日誌

### v1.0.0 (LIFF 版本)
- ✅ 整合 LIFF SDK
- ✅ 添加原生分享功能
- ✅ 支援 URL 參數位置分享
- ✅ 優化觸控體驗
- ✅ 適配 LINE 環境 UI

## 支援

如果遇到問題或需要協助，請：
1. 檢查本文件的故障排除章節
2. 查看 [LINE LIFF 官方文件](https://developers.line.biz/en/docs/liff/)
3. 在 GitHub repository 中建立 issue

## 授權

本專案採用與主版本相同的授權條款。 