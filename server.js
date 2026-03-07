const express = require('express');
const gameserver = require('./gameserver');
const app = express();
app.use((req, res, next) => {
 Content-Security-Policy: default-src https:; script-src https: 'unsafe-inline'; style-src https: 'unsafe-inline'
  next();
});

// This starts your game logic
new gameserver(app);


