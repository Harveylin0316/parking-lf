# 台北市停車場查詢 LIFF 應用

一個基於 LINE Front-end Framework (LIFF) 的停車場查詢應用，可以在 LINE 應用內快速查找附近的停車位。

## 功能特點

- 在 LINE 應用內顯示 Google Maps
- 自動定位使用者位置
- 顯示附近停車場及即時車位資訊
- 支援分享停車場資訊到 LINE 聊天
- 導航功能（支援 Google Maps）
- 收藏常用停車場

## 技術架構

- LINE LIFF SDK
- Google Maps JavaScript API
- HTML5 Geolocation API
- Netlify Serverless Functions

## 開發環境設置

1. 安裝依賴
```bash
npm install
```

2. 設置環境變數
- 複製 `config.example.js` 為 `config.js`
- 填入必要的 API Keys:
  - LIFF ID
  - Google Maps API Key

3. 本地開發
```bash
npm run dev
```

## LINE 開發者設置

1. 在 [LINE Developers Console](https://developers.line.biz/console/) 創建新的 Provider
2. 創建一個新的 LIFF 應用
3. 設置 Endpoint URL
4. 複製 LIFF ID 到設定檔

## 部署

本專案使用 Netlify 進行部署：

1. 連接 GitHub Repository
2. 設置環境變數
3. 部署應用

## 授權

MIT License

## 貢獻指南

歡迎提交 Pull Request 或建立 Issue。 