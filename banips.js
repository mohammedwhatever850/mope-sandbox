function banips(ws, req) { // Added 'req' to get headers
    // Get the real player IP from Render's headers
    const realIP = req.headers['x-forwarded-for'] || ws._socket.remoteAddress;

    // List of banned IPs
    const bannedList = [
        '::ffff:123.456.78.9', // Example Banned IP
        '::ffff:00.00.00.00'   // Another Banned IP
    ];

    // Check if the connecting IP is in our blacklist
    if (bannedList.some(ip => realIP.includes(ip))) {
        console.log(`[BANNED] Access denied for: ${realIP}`);
        ws.close(); 
    }
}

banips.prototype = {};
module.exports = banips;
