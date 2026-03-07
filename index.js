const express = require('express');
const http = require('http');
const path = require('path');
const gameserver = require('./gameserver'); 

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8080;

// This serves your website files (html, css, js) 
// Make sure your client files are in a folder named "public"
app.use(express.static(path.join(__dirname, 'public')));

const game = new gameserver();

// This connects the web port to your game logic
server.on('upgrade', (request, socket, head) => {
    game.handleUpgrade(request, socket, head);
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
