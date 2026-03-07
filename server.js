const express = require('express');
const path = require('path');
const fs = require('fs');
const gameserver = require('./gameserver');

const app = express();

// 1. Set CSP Headers FIRST to allow 'eval' injections
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

// 2. Serve static files from the current directory
app.use(express.static(__dirname));

// 3. The Main Route - Points to sandbox.html in the same folder
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'sandbox.html'));
});

// 4. Initialize game logic (Port/Listen is handled inside gameserver.js)
new gameserver(app);
