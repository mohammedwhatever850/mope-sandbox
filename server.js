const express = require('express');
const path = require('path');
const GameServer = require('./gameserver');

const app = express();
const port = process.env.PORT || 80;

// 1. Tell Express where your game files are
app.use(express.static(__dirname));

// 2. This replaces the "Hello World" line
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 3. Initialize your game
new GameServer(app);

// 4. Start listening
app.listen(port, "0.0.0.0", () => {
  console.log(`Game is live on port ${port}`);
});
