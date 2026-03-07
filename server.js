const express = require('express');
const path = require('path');
const gameserver = require('./gameserver');

const app = express();

// 1. CSP and Cache Killing
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'self' 'unsafe-inline' 'unsafe-eval'; connect-src *; style-src * 'unsafe-inline';");
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  next();
});

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'sandbox.html'));
});

// 2. Initialize the game
new gameserver(app);

// 3. New log message to verify deployment
const now = new Date().toLocaleTimeString();
console.log(`[${now}] SUCCESS: Server is running the UPDATED code!`);
