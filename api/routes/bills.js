const Bill = require("../models/Bill.js");
const express = require("express");
const router = express.Router();

router.get("/get-all", async (req,res) => {
  try {
    const bills = await Bill.find();
    res.status(200).json(bills);
  } catch (error) {
    console.log(error)
  }
})

router.post("/add-bill", async (req, res) => {
  try {
    const newBill = new Bill(req.body);
    await newBill.save();
    res.status(200).json("Item added successfully.");
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/update-Bill", async (req,res) => {
  try {
    const bills = await Bill.findOneAndUpdate({_id : req.body.BillId},req.body);
    res.status(200).json("Item updated successfully");
  } catch (error) {
    console.log(error)
  }
})

router.delete("/delete-Bill", async (req,res) => {
  try {
    const bills = await Bill.findOneAndDelete({_id : req.body.BillId});
    res.status(200).json("Item deleted successfully");
  } catch (error) {
    console.log(error)
  }
})


module.exports = router;