function devip(ws) {
  const myIP = '41.42.166.39'; // Replace this with the IP you found on Google
  
  if (ws._socket.remoteAddress == '::1' || 
      ws._socket.remoteAddress == '::ffff:127.0.0.1' || 
      ws._socket.remoteAddress.includes(myIP)) { 
    
    ws.isdeveloper = true; // GRANT DEVELOPER STATUS
  }
}

devip.prototype = {};
module.exports = devip;
