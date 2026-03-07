const express = require('express');
const gameserver = require('./gameserver');
app.use((req, res, next) => {
  // This header tells the browser to allow 'eval' and inline scripts
  res.setHeader(
    "Content-Security-Policy", 
    "default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline'; img-src * data: blob:; frame-src *; style-src * 'unsafe-inline';"
  );
  next();
});

// This starts your game logic
new gameserver(app);


