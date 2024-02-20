import { WebSocketServer } from "ws";
import { randomUUID } from "crypto";

const wss = new WebSocketServer({ port: 8080 });


// socket ID to instance
const sockets: { [key: string]: WebSocket } = {};

// room-socket index
const rooms: { [roomID: string]: string[] } = {};

wss.on('connection', function connection(ws: WebSocketServer) {
  ws.id = randomUUID(); // Assign a unique ID to the WebSocket connection
  ws.isAlive = true; // Mark the connection as alive
  sockets[ws.id] = ws; // Store the WebSocket in the sockets object

  console.log('Client connected with ID:', ws.id);

  ws.on('message', function incoming(message: string) {
    console.log(`Received message: ${message} from ws ${ws.id}`);
    const msgJson = JSON.parse(message.toString());

    // Handle message based on its type (Subscribe, Unsubscribe, or other)
    handleMessage(ws, msgJson);

    // Broadcast the message to other clients in the same room, except the sender
    if (!msgJson.MessageType.startsWith("Subscribe") && !msgJson.MessageType.startsWith("Unsubscribe")) {
      broadcastToRoom(ws.id, msgJson.RoomID, message.toString());
    }
  });

  ws.on('pong', function heartbeat(this:any) {
    this.isAlive = true;
  });

  ws.on('close', function handleClose(this:any) {
    console.log('disconnected', this.id);
    removeFromAllRooms(this.id);
  });
});

// const interval = setInterval(function ping() {
//   wss.clients.forEach(function each(ws: WebSocketServer) {
//     if (ws.isAlive === false) return ws.close();

//     ws.isAlive = false;
//     ws.ping();
//   });
// }, 30000);

function handleMessage(ws: WebSocketServer, msgJson: any) {
  // Handle Subscribe and Unsubscribe messages
  if (msgJson.MessageType.startsWith("Subscribe")) {
    subscribeToRoom(ws.id, msgJson.RoomID);
  } else if (msgJson.MessageType.startsWith("Unsubscribe")) {
    unsubscribeFromRoom(ws.id, msgJson.RoomID);
  }
}

function broadcastToRoom(senderId: string, roomID: string, message: string) {
  rooms[roomID]?.forEach(socketID => {
    if (socketID !== senderId) {
      (sockets[socketID] as WebSocketServer)?.send(message);
    }
  });
}

function subscribeToRoom(socketID: string, roomID: string) {
  if (!rooms[roomID]) rooms[roomID] = [];
  if (!rooms[roomID].includes(socketID)) rooms[roomID].push(socketID);
}

function unsubscribeFromRoom(socketID: string, roomID: string) {
  rooms[roomID] = rooms[roomID]?.filter(id => id !== socketID) || [];
}

function removeFromAllRooms(socketID: string) {
  Object.keys(rooms).forEach(roomID => {
    unsubscribeFromRoom(socketID, roomID);
  });
}

console.log('WebSocket server running on ws://localhost:8080');
