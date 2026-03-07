const express = require('express');
const path = require('path');
const gameserver = require('./gameserver');

const app = express();
const port = process.env.PORT || 80;

// FIX 1: Set CSP Headers at the VERY TOP
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy", 
    "default-src * 'unsafe-inline' 'unsafe-eval'; " +
    "script-src * 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "connect-src * 'unsafe-inline'; " +
    "img-src * data: blob:; " +
    "style-src * 'unsafe-inline';"
  );
  next();
});

// FIX 2: Static files must be declared BEFORE routes
app.use(express.static(__dirname));

// FIX 3: Explicitly serve sandbox.html for the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'sandbox.html'));
});

// FIX 4: Initialize game logic (Ensure gameserver.js doesn't have app.get('/'))
new gameserver(app);
