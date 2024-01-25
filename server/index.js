const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes.js')


require('dotenv').config() ;
const app = express() ;
const PORT = process.env.PORT || 8000 ;

const dbconn = require('./db/conn.js');
const router = require('./routes/userRoutes.js');
app.use(cors()) ;
app.use(express.json());

dbconn() ;

app.use('/api/auth' , userRoutes)


const server = app.listen(PORT, () =>
  console.log(`Server running  at ${PORT}`)
);
