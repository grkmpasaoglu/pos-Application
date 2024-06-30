const User = require("../models/User.js");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")

router.get("/get-all", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.log(error)
    }
})

router.post("/register", async (req, res) => {
    try {
        // const newUser = new User(req.body);
        // await newUser.save();
        const { username, eMail, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            eMail,
            password: hashedPassword
        });
        await newUser.save();
        res.status(200).json("A new user created successfully.");
    } catch (error) {
        res.status(400).json(error);
    }
});

//login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ eMail: req.body.eMail });
        if (!user) {
            return res.status(404).send({ error: "User is not found." });
        }
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
          );
      
          if (!validPassword) {
            res.status(403).json("Invalid password!");
          } else {
            res.status(200).json(user);
          }
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put("/update-user", async (req, res) => {
    try {
        const users = await User.findOneAndUpdate({ _id: req.body._id }, req.body);
        res.status(200).json("Item updated successfully");
    } catch (error) {
        console.log(error)
    }
})

router.delete("/delete-user", async (req, res) => {
    try {
        const users = await User.findOneAndDelete({ _id: req.body.UserId });
        res.status(200).json("Item deleted successfully");
    } catch (error) {
        console.log(error)
    }
})


module.exports = router;