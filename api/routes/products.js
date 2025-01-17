const Product = require("../models/Product.js");
const express = require("express");
const router = express.Router();

router.get("/get-all", async (req,res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.log(error)
  }
})

router.post("/add-product", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(200).json("Item added successfully.");
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/update-product", async (req, res) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: req.body.ProductId },
      { title: req.body.title, price: req.body.price, img:req.body.img },
      { new: true } // Bu, güncellenmiş belgeyi döndürmek için kullanılır
    );
    if (!updatedProduct) {
      return res.status(404).json("Product not found");
    }
    res.status(200).json("Product updated successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});


router.delete("/delete-product", async (req,res) => {
  try {
    const products = await Product.findOneAndDelete({_id : req.body.ProductId});
    res.status(200).json("Item deleted successfully");
  } catch (error) {
    console.log(error)
  }
})


module.exports = router;