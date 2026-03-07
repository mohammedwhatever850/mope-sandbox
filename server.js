const express = require('express');
const path = require('path');
const gameserver = require('./gameserver');

const app = express();
const port = process.env.PORT || 80;

// 1. Force the CSP to allow 'eval' for your injections
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy", 
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "connect-src *; " + 
    "style-src 'self' 'unsafe-inline';"
  );
  next();
});

app.get('/', (req, res) => {
  // Use '..' to go UP one folder from 'src' to find the main directory
  res.sendFile(path.join(__dirname, '..', 'sandbox.html'));
});

// 3. Fix "Cannot GET /" by explicitly sending the file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'sandbox.html'));
});

// 4. Initialize the game logic
new gameserver(app);

