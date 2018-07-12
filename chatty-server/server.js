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
const re = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/i;

function incoming(incomingMessage) {
  let message = JSON.parse(incomingMessage);
  message.id = uuidv4();
  if (message.content.match(re)) {
    const imgUrl = re.exec(message.content);
    const imgObj = {
      id: message.id,
      type: 'image',
      username: message.username,
      color: message.color,
      url: imgUrl[0]
    }
    message = JSON.stringify(imgObj);
    wss.clients.forEach((client) => {
      try {
        client.send(message);
      } catch (error) {
        console.log(`Message failed to send.................${error}`);
      }
    })

  } else {
    message = JSON.stringify(message);
    wss.clients.forEach((client) => {
      try {
        client.send(message);
      } catch (error) {
        console.log(`Message failed to send.................${error}`);
      }
    })
  }
}


function newUser(ws) {
  const color = randomColor({
    luminosity: 'bright',
    format: 'rgb' // e.g. 'rgb(225,200,20)'
  });
  ws.send(JSON.stringify({ type: 'newConnection', color: color }));
}


let numOfUsers = {
  type: 'userCountUpdate',
  count: 0
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
