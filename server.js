const express = require('express');
const http = require('http');
const path = require('path');
const gameserver = require('./gameserver');

app = express();
const server = http.createServer(app);

// 1. Set CSP for your game scripts
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'self' 'unsafe-inline' 'unsafe-eval'; connect-src *; style-src * 'unsafe-inline';");
  next();
});

// 2. Serve your game files
app.use(express.static(__dirname));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

// 3. Start the server on Render's port
const port = process.env.PORT || 10000;
server.listen(port, "0.0.0.0", () => {
  console.log(`[RENDER] HTTP and WebSockets active on port ${port}`);
  
  // 4. Pass the server and app into your game logic
  new gameserver(server, app);
});

