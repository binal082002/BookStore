const mongoose = require("mongoose");

const payment_schema = new mongoose.Schema({
    
    razorpay_order_id: {
        type: String,
        required: true
    },

    razorpay_payment_id: {
        type: String,
        required: true
    },

    razorpay_signature: {
        type: String,
        required: true
    },
});


const Payment = mongoose.model("Payment", payment_schema);

module.exports = Payment;
