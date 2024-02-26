const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes.js')
const messageRoutes = require('./routes/messagesRoute.js')

const socket = require('socket.io')

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 8000;

const dbconn = require('./db/conn.js');

app.use(cors());
app.use(express.json());

dbconn();

app.use('/api/auth', userRoutes);
app.use('/api/messages', messageRoutes);


const server = app.listen(PORT, () =>
  console.log(`Server running  at ${PORT}`)
);

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  }
})


// created a global Map (onlineUsers) that can be accessed and modified by any part of the Node.js application
// Stores all the online Users
global.onlineUsers = new Map();



//  event listener for the "connection" event 
//  which is triggered when a new client connects to the Socket.IO server
//  callback function receives a socket object representing the connection to the individual client.
io.on("connection", (socket) => {
  //socket object is stored globally as chatSocket
  global.chatSocket = socket;

  socket.on("add-user", (userId) => {
    // store in map
    onlineUsers.set(userId, socket.id);
  });

  // event listener for "send-msg" event, which is triggered when a client sends a message
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      // actual message content (data.msg)
      socket.to(sendUserSocket).emit("msg-receive", data.msg);
    }
  });
});