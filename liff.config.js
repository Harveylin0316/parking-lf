// LIFF 配置文件
// 請將 YOUR_LIFF_ID 替換為實際的 LIFF ID

const liffConfig = {
    // 開發環境 LIFF ID
    development: {
        liffId: 'YOUR_DEVELOPMENT_LIFF_ID', // 請替換為開發環境的 LIFF ID
        apiKey: '' // 如果需要特別的 API Key
    },
    
    // 生產環境 LIFF ID
    production: {
        liffId: '2006491051-9B2k0Mqz', // 請替換為生產環境的 LIFF ID
        apiKey: '' // 如果需要特別的 API Key
    },
    
    // 預設配置
    default: {
        liffId: 'YOUR_DEFAULT_LIFF_ID', // 請替換為預設的 LIFF ID
        loginRequired: false, // 是否需要用戶登入
        enableShareTargetPicker: true, // 是否啟用分享功能
        enableWebGL: true // 是否啟用 WebGL（對地圖有幫助）
    }
};

// 獲取目前環境的配置
function getLiffConfig() {
    const hostname = window.location.hostname;
    
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return { ...liffConfig.default, ...liffConfig.development };
    } else {
        return { ...liffConfig.default, ...liffConfig.production };
    }
}

// 導出配置
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { liffConfig, getLiffConfig };
} 