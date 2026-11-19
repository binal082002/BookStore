const instance = require("../razorpay_instance");
const crypto = require("crypto");
const Payment = require("../models/payment-model");
const Order = require("../models/order-model");
const Book = require("../models/book-model");

const checkout = async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({
        message: "Order ID is required",
      });
    }

    // Find the pending order belonging to the logged-in user.
    const existingOrder = await Order.findOne({
      _id: orderId,
      user: req.userID,
      status: "Pending",
    });

    if (!existingOrder) {
      return res.status(404).json({
        message: "Pending order not found",
      });
    }

    // Fetch the latest book details.
    const book = await Book.findById(existingOrder.book);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    if (Number(book.stock) <= 0) {
      return res.status(400).json({
        message: "This book is out of stock. Payment cannot be initiated.",
      });
    }

    // Always use the latest book price.
    const currentPrice = Number(book.price);

    if (!Number.isFinite(currentPrice) || currentPrice <= 0) {
      return res.status(400).json({
        message: "Invalid book price",
      });
    }

    // Update the pending order with the latest price.
    existingOrder.totalAmount = currentPrice;

    // Create a fresh Razorpay order using the updated price.
    const amountInPaise = Math.round(currentPrice * 100);

    const razorpayOrder = await instance.orders.create({
      amount: amountInPaise,
      currency: "INR",
    });

    // Save the new Razorpay order ID and updated amount.
    existingOrder.razorpayOrderId = razorpayOrder.id;
    await existingOrder.save();

    return res.status(200).json({
      success: true,
      order: razorpayOrder,
    });

  } catch (err) {
    console.error("Checkout error:", err);

    return res.status(500).json({
      message: "Unable to create payment order",
    });
  }
};

// const verification = async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//       req.body;

//     const response = razorpay_order_id + "|" + razorpay_payment_id;

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(response.toString())
//       .digest("hex");

//     // console.log("sig received", razorpay_signature);
//     // console.log("sign generated", expectedSignature);

//     const isAuthentic = expectedSignature === razorpay_signature;

//     if (isAuthentic) {
//       // create payment and add data in database

//       await Payment.create({
//         razorpay_order_id,
//         razorpay_payment_id,
//         razorpay_signature,
//       });

//       res.redirect(
//         `https://ecommbookstore.netlify.app/paymentsuccess?reference=${razorpay_payment_id}`
//       );
//     } else {
//       res.status(400).json({
//         succes: false,
//         message: "unaithenticated!!",
//       });
//     }
//   } catch (err) {
//     res.status(500).json({ message: "Verification error!!" });
//   }
// };

const verification = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing payment verification details",
      });
    }

    const response = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(response)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    const order = await Order.findOne({
      razorpayOrderId: razorpay_order_id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const updatedOrder = await Order.findOneAndUpdate(
      {
        _id: order._id,
        status: "Pending",
      },
      {
        $set: { status: "Completed" },
      },
      {
        new: true,
      }
    );

    if (!updatedOrder) {
      return res.status(200).json({
        success: true,
        message: "Order already processed",
      });
    }

    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    const updatedBook = await Book.findOneAndUpdate(
      {
        _id: order.book,
        stock: { $gt: 0 },
      },
      {
        $inc: { stock: -1 },
      },
      {
        new: true,
      }
    );

    if (!updatedBook) {
      console.error(
        "Payment completed, but book stock could not be updated:",
        order.book
      );
    }

    return res.redirect(
      `${process.env.CLIENT_URL}/Myorder/${order.user}/detail`
    );
  } catch (err) {
    console.error("Payment verification error:", err);

    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};

module.exports = { checkout, verification };
