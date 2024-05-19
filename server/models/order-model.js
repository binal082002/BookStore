const mongoose = require("mongoose");
const User = require("./user-model");
const Book = require("./book-model");

const order_schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Completed", "Cancelled"],
        default: "Pending"
    }
});

const Order = mongoose.model("Order", order_schema);

module.exports = Order;
