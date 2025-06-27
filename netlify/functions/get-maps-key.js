exports.handler = async function(event, context) {
    // 只允許從特定來源存取
    const allowedOrigins = [
        'https://line.me',
        'https://liff.line.me'
    ];

    const origin = event.headers.origin || '';
    const isAllowedOrigin = allowedOrigins.includes(origin) || origin.endsWith('.netlify.app');

    // 讀取環境變數中的 API Key
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': isAllowedOrigin ? origin : allowedOrigins[0],
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET'
            },
            body: JSON.stringify({ error: 'API Key not configured' })
        };
    }

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': isAllowedOrigin ? origin : allowedOrigins[0],
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET'
        },
        body: JSON.stringify({ apiKey })
    };
}; 