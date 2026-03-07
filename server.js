const express = require('express');
const path = require('path');
const fs = require('fs');
const gameserver = require('./gameserver');

const app = express();

// 1. CSP for Eval (Required for your userscripts)
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'self' 'unsafe-inline' 'unsafe-eval'; connect-src *; style-src * 'unsafe-inline';");
  next();
});

// 2. Explicitly serve index.html for BOTH / and /index.html
const serveIndex = (req, res) => {
  const filePath = path.join(__dirname, 'index.html');
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send(`Missing: index.html was not found in ${__dirname}`);
  }
};

app.get('/', serveIndex);
app.get('/index.html', serveIndex);

// 3. Static middleware AFTER routes to prevent conflicts
app.use(express.static(__dirname));

// 4. Start the game logic
new gameserver(app);
