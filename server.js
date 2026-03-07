const express = require('express');
const gameserver = require('./gameserver');
const app = express();

// 1. REMOVE the app.get('/', ...) line that sends "Hello World!"

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "script-src 'self' 'unsafe-inline' 'unsafe-eval';");
  next();
});

// This starts your game logic
new gameserver(app);

