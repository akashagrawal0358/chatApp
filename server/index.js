const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config() ;
const app = express() ;
const PORT = process.env.PORT || 8000 ;

const dbconn = require('./db/conn.js');
app.use(cors()) ;
app.use(express.json());

dbconn() ;


const server = app.listen(PORT, () =>
  console.log(`Server running  at ${PORT}`)
);

// mongoose.connect(process.env.MONGO_URL , ()=>{

// })


console.log("heelooo");