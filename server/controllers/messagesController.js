
const Messages = require("../models/messageModel");


// ----------------- addMessage -----------------------------------------------

module.exports.addMessage = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;

        // Create a new message using the messageModel
        const data = await Messages.create({
            message: { text: message },
            users : [from , to] ,
            sender : from,
        });
        
         // Check if the message created successfully or not
        if(data) return res.json({ msg: "Message added Successfully.." }) ;
        return res.json({ msg: "Failed to add message to the database.."})
    }
    catch (ex) {
        next(ex);
    }
};



// ----------------- getMessages -----------------------------------------------

module.exports.getAllMessage = async (req, res, next) => {
    try {
      const { from, to } = req.body;
      
      // retrieves messages where the users array contains both 'from' and 'to'  
      // sort method is used to sort the messages by their updatedAt property in ascending order.
      const messages = await Messages.find({
        users: {
          $all: [from, to],
        },
      }).sort({ updatedAt: 1 });
  
      const projectedMessages = messages.map((msg) => {
        return {
          fromSelf: msg.sender.toString() === from,
          message: msg.message.text,
        };
      });
      res.json(projectedMessages);
    } catch (ex) {
      next(ex);
    }
  };