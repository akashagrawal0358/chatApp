
const mongoose = require('mongoose');
require('dotenv').config() ;

const dbconn = async()=>{
    try{
       await mongoose.connect(process.env.MONGO_URL ) ;
       console.log("DataBase Connected...... ");
    }
    catch(error){
        console.error("Error Occurred  in connecting Database " , error.message);
    }
} 

module.exports = dbconn ;