// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');


const PORT = 3001;


const server = express()

  .use(express.static('../dist'))
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));


const wss = new SocketServer({ server });

function incoming(incomingMessage) {
  let message = JSON.parse(incomingMessage)
  message.id = uuidv4();
  message = JSON.stringify(message);
  wss.clients.forEach((client) => {
    client.send(message);
  })
}

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('message', incoming);

  // ws.send('Welcome to Chatty-App');

  // Set up a callback for when a client closes the socket.
  ws.on('close', () => console.log('Client disconnected'));
});
