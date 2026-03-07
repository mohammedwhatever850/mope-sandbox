const express = require('express');
const http = require('http');
const path = require('path');
const gameserver = require('./gameserver'); // Loads your big script

const app = express();
// This automatically provides the port (e.g., 10000 on Render or 8080 locally)
const port = process.env.PORT || 8080; 

// 1. Serve your website files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// 2. Start the Game Server
// This passes the port to your function gameserver(port)
const game = new gameserver(port);

console.log(`Server is booting on port ${port}...`);
