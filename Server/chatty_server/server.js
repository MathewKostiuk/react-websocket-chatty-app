const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });
const uuidv4 = require('uuid/v4');

// Broadcast to all.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyStata === SocketServer.OPEN) {
      client.send(data);
    }
  });
};

colourPicker = () => {
  const colours = ['#941010', '#FA34D6', '#1B262B', '#148887'];
  const random = Math.floor(Math.random() * 4);
  return colours[random];
};


// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.on('connection', (ws) => {
  console.log('Client connected');
  let numberOfClients = wss.clients.size;
  let clients = {
    number: numberOfClients,
    type: 'onlineUsers'
  };
  let colour = colourPicker();
  wss.broadcast(JSON.stringify(clients));

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.content === '') {
      return;
    }
    const uuid = uuidv4();
    const response = {
      username: msg.username,
      content: msg.content,
      key: uuid,
      type: '',
      colour: colour
    };
    if (msg.type === 'postMessage') {
      response.type = 'incomingMessage';
    }
    if (msg.type === 'postNotification') {
      response.type = 'incomingNotification';
    }
    const jString = JSON.stringify(response);
    wss.broadcast(jString);
  };

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    wss.broadcast(JSON.stringify(clients));
  });
});