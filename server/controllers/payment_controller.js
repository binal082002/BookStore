const instance = require('../razorpay_instance');
const crypto = require("crypto");
const Payment = require("../models/payment-model");

const checkout = async (req, res) => {
    try {
        const {amount} = req.body;
        const final_amount = Number(amount) * 100;
        const options = {
            amount: Number(final_amount)*100,
            currency: "INR",
        };

        // console.log("Amount" , amount);
 
        const order = await instance.orders.create(options);

        // console.log(order);
        res.status(200).json({ success: true , order});
    } catch (err) {
        res.status(500).json({ message: "checkout error, order not created!!" });
    }
};

const verification = async(req,res) => {
    try{
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const response = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(response.toString())
            .digest("hex");

        // console.log("sig received", razorpay_signature);
        // console.log("sign generated", expectedSignature);

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            // create payment and add data in database

            await Payment.create({
                razorpay_order_id, razorpay_payment_id, razorpay_signature,
            });

            res.redirect(
            `https://ecommbookstore.netlify.app/paymentsuccess?reference=${razorpay_payment_id}`
            );
        }

        else {
            res.status(400).json({
            succes : false,
            message : "unaithenticated!!"
        });
    }

    }catch(err){
        res.status(500).json({ message: "Verification error!!" });
    }
}

module.exports = { checkout, verification };
