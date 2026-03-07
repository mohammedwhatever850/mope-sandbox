const express = require('express');
const gameserver = require('./gameserver');
const app = express();

// 1. REMOVE the app.get('/', ...) line that sends "Hello World!"

// 2. ADD this line to serve your HTML/JS files
app.use(express.static(__dirname)); 

// This starts your game logic
new gameserver(app);
