const express = require('express');
const path = require('path');
const gameserver = require('./gameserver');

const app = express();

// 1. CSP for injections (Essential for your userscripts/tools)
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

// 2. This automatically serves index.html for "/"
app.use(express.static(__dirname));

// 3. Initialize game (Ensure this doesn't overwrite the app)
new gameserver(app);
