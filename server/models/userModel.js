const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        min: 3,
        unique: true,
        max: 20,
        required: true,
    },
    email: {
        type: String,
        max: 50,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        min: 8,
        required: true,
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false,
    },
    avatarImage: {
        type: String,
        default: "",
    },
});

module.exports = mongoose.model("Users", userSchema);