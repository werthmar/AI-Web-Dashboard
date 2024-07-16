/**
 * This is the API used from outside of the react App.
 * This is a Websocket which can be used to send data and events to the react server
 * The api inside of the app folder is used to communicate between the client side and the server side within the react environment
 * 
 * --- Access ---
 * You can access the websocket with localhost:4000/websocket/event
 * 
 * --- Parameters ---
 * There are 2 accepted types of request parameters, message and coordinates
 * json body example 1:
 * {
 *    "type": "message",
 *    "data": "there was a problem on the server"
 * }
 * json body example 2:
 * {
 *    "type": "coordinates",
 *    "data": [
 *                { "x": 123, "y": 550, "label": "Kuh 1", "status": 1 },
 *                { "x": 123, "y": 550, "label": "Kuh 2", "status": 0 }
*              ]
 * }
*/

const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    const parsedMessage = JSON.parse(message);
    switch (parsedMessage.type) {
      case 'message':
        console.log('Received message:', parsedMessage.data);
        break;
      case 'coordinates':
        console.log('Received coordinates:', parsedMessage.data);
        break;
      default:
        console.log('Unknown message type:', parsedMessage.type);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

app.post('/websocket/event', (req, res) => {
  const event = req.body;
  console.log('Received event:', event);

  // Broadcast the event to all connected WebSocket clients
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(event));
    }
  });

  res.send({ status: 'Event received', data: event });
});

server.listen(port, () => {
  console.log(`WebSocket server is running on http://localhost:${port}`);
});