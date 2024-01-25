const User = require("../models/userModel");
const bcrypt = require("bcrypt");


// Contains functionality of each route 


// ------------------  Register -----------------------------------------------

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const userExist = await User.findOne({ username });

        if (userExist) {
            return res.json({ msg: "Username already used", status: false });
        }
        const emailExist = await User.findOne({ email });
        if (emailExist) {
            return res.json({ msg: "Email already used", status: false });
        }

        // Now hashed the user password 
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            username,
            password: hashedPassword,
        });

        // Delete user password 
        delete user.password;
        return res.json({ status: true, user });
    } catch (ex) {
        next(ex);
    }
};



// --------------------- Login ------------------------------------------------------

module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.json({ msg: "Incorrect Username or Password", status: false });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.json({ msg: "Incorrect Username or Password", status: false });
        }
        delete user.password;
        return res.json({ status: true, user });
    } catch (ex) {
        // passing the error to the next middleware
        next(ex);
    }
};