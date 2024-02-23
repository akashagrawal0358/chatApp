
// Contains all routes ---> which is defined in controllers

const { register, login, setAvatar, allUsers } = require('../controllers/userController');

const router = require('express').Router() ;


router.post('/register', register);
router.post('/login', login);
router.post('/setAvatar/:id', setAvatar )
router.get('/allUsers/:id' , allUsers) 



module.exports = router ;