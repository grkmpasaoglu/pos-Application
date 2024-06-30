const User = require("../models/User.js");
const express = require("express");
const router = express.Router();

router.get("/get-all", async (req,res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error)
  }
})

router.get("/", async (req,res) => {
    try {
const userID = req.body.userId;
      res.status(200).json(users);
    } catch (error) {
      console.log(error)
    }
  })
  


router.put("/update-User", async (req,res) => {
  try {
    const Users = await User.findOneAndUpdate({_id : req.body.UserId},req.body);
    res.status(200).json("Item updated successfully");
  } catch (error) {
    console.log(error)
  }
})

router.delete("/delete-User", async (req,res) => {
  try {
    const Users = await User.findOneAndDelete({_id : req.body.UserId});
    res.status(200).json("Item deleted successfully");
  } catch (error) {
    console.log(error)
  }
})


module.exports = router;