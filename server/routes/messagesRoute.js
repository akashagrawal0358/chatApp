
// Contains all routes ---> which is defined in controllers

const { addMessage, getAllMessage } = require('../controllers/messagesController');


const router = require('express').Router() ;

router.post('/addmsg/', addMessage);
router.post('/getmsg/', getAllMessage);




module.exports = router ;