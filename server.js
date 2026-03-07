const express = require('express');
const path = require('path');
const gameserver = require('./gameserver');

const app = express();
const port = process.env.PORT || 80;

// 1. CSP Header to allow eval() and injections
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "script-src 'self' 'unsafe-inline' 'unsafe-eval';");
  next();
});

// 2. Serve static files from the main folder
app.use(express.static(__dirname));

// 3. Point the main URL to your sandbox file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'sandbox.html'));
});

// 4. Initialize game logic
new gameserver(app);

// 5. Start the server
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is online on port ${port}`);
});
