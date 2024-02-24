const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes.js')
const messageRoutes = require('./routes/messagesRoute.js')


require('dotenv').config() ;
const app = express() ;
const PORT = process.env.PORT || 8000 ;

const dbconn = require('./db/conn.js');

app.use(cors()) ;
app.use(express.json());

dbconn() ;

app.use('/api/auth' , userRoutes);
app.use('/api/messages' , messageRoutes);


const server = app.listen(PORT, () =>
  console.log(`Server running  at ${PORT}`)
);
