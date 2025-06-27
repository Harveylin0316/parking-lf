exports.handler = async function(event, context) {
    return {
        statusCode: 200,
        body: process.env.GOOGLE_MAPS_API_KEY
    };
} 