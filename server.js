const express = require('express');
const http = require('http');
const path = require('path');
const gameserver = require('./gameserver');

const app = express();
const server = http.createServer(app);

// 1. Content Security Policy (Allows your game scripts to run)
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy", 
    "default-src * 'unsafe-inline' 'unsafe-eval'; " +
    "script-src * 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "connect-src *; " + 
    "style-src 'self' 'unsafe-inline';"
  );
  next();
});

// 2. Serve static files (Finds index.html automatically)
app.use(express.static(__dirname));

// 3. Fallback route for the root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 4. Start the server on Render's port
const port = process.env.PORT || 10000;
server.listen(port, "0.0.0.0", () => {
  console.log(`[SYSTEM] Server active on port ${port}`);
  
  // Start game logic and pass the server to it
  new gameserver(server); 
});
