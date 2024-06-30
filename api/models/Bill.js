const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const BillSchema = new Schema(
    {
        title: { type: String, required: true },
        customerPhoneNumber: { type: String, required: true },
        paymentMode: { type: String, required: true },
        subTotal: { type: String, required: true },
        cartItems: { type: Array, required: true },
        tax: { type: Number, required: true },
        totalAmount: { type: String, required: true },
    },
    { timestamps: true }
);

const Bill = mongoose.model("Bills", BillSchema);
module.exports = Bill;