// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');
const randomColor = require('randomcolor');


const PORT = 3001;


const server = express()

  .use(express.static('../dist'))
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));


const wss = new SocketServer({ server });

function incoming(incomingMessage) {
  let message = JSON.parse(incomingMessage);
  message.id = uuidv4();
  message = JSON.stringify(message);
  wss.clients.forEach((client) => {
    try {
      client.send(message);
    } catch (error) {
      console.log(`Message failed to send.................${error}`);
    }
  })
}

let numOfUsers = {
  type: 'userCountUpdate',
  count: 0
}

function newUser(ws) {
  const color = randomColor({
    luminosity: 'bright',
    format: 'rgb' // e.g. 'rgb(225,200,20)'
  });
  ws.send(JSON.stringify({ type: 'newConnection', color: color }));
}

function userCountChange(num) {
  numOfUsers.count += num;
  let message = JSON.stringify(numOfUsers)
  wss.clients.forEach((client) => {
    try {
      client.send(message);
    } catch (error) {
      console.log(`Message failed to send.................\n${error}`);
    }
  })
}

wss.on('connection', (ws) => {
  userCountChange(1);
  newUser(ws);
  ws.on('message', incoming);
  try {
    ws.send(JSON.stringify(numOfUsers));
  } catch (error) {
    console.log(`Unable to send userNumber to new connection.......\n${error}`);

  }

  // Set up a callback for when a client closes the socket.
  ws.on('close', () => {
    userCountChange(-1)
    console.log(`User Count = ${numOfUsers.count}`);
  });
});
