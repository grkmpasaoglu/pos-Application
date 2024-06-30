const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const CategorySchema = new Schema(
    {
        title: { type: String, required: true }
    },
    { timestamps: true }
);

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;