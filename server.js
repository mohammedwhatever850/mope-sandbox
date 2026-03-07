const express = require('express');
const path = require('path');
const gameserver = require('./gameserver');

const app = express();

// 1. Manual CSP (Better than Helmet for your specific needs)
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'self' 'unsafe-inline' 'unsafe-eval'; connect-src *; style-src * 'unsafe-inline';");
  
  // 2. Disable Caching so you don't keep seeing "Hello World"
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'sandbox.html'));
});

// Start the game logic
new gameserver(app);
