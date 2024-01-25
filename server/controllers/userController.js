const User = require("../models/userModel");
const bcrypt = require("bcrypt");


// Contains functionality of each route 

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