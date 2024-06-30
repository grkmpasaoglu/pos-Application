const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const UserSchema = new Schema(
    {
        username: { type: String, required: true },
        eMail: { type: String, required: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

const User = mongoose.model("users", UserSchema);
module.exports = User;
