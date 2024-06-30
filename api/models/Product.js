const { Schema } = require("mongoose");
const mongoose = require("mongoose");


const ProductSchema = new Schema(
    {
        title: { type: String, required: true },
        img: {type: String, required:true},
        price: {type:Number, required:true},
        category: {type:String, required:true}
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
