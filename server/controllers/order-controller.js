const Order = require("../models/order-model");
const Book = require("../models/book-model");

const createOrder = async (req, res) => {
    try {
        const { book: bookId } = req.body;

        if (!bookId) {
            return res.status(400).json({
                message: "Book ID is required",
            });
        }

        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({
                message: "Book not found",
            });
        }

        // Check whether this user already has a pending order
        // for this particular book.
        const existingOrder = await Order.findOne({
            user: req.userID,
            book: book._id,
            status: "Pending",
        });

        // Reuse the existing order instead of creating another one.
        if (existingOrder) {
            return res.status(200).json({
                message: "Existing pending order found",
                order: existingOrder,
            });
        }

        if (book.stock <= 0) {
            return res.status(400).json({
                message: "Book is out of stock",
            });
        }

        const newOrder = await Order.create({
            user: req.userID,
            book: book._id,
            totalAmount: book.price,
            status: "Pending",
        });

        return res.status(201).json({
            message: "Order created successfully",
            order: newOrder,
        });

    } catch (err) {
        console.error("Create order error:", err);

        return res.status(500).json({
            message: "Unable to create order",
        });
    }
};


const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findOne({
            _id: id,
            user: req.userID,
        });

        if (!order) {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        // Refresh the amount only for pending orders.
        if (order.status === "Pending") {
            const book = await Book.findById(order.book);

            if (!book) {
                return res.status(404).json({
                    message: "Book not found",
                });
            }

            order.totalAmount = Number(book.price);
            await order.save();
        }

        return res.status(200).json({
            order,
        });

    } catch (err) {
        console.error("Get order error:", err);

        return res.status(500).json({
            message: "Unable to fetch order",
        });
    }
};

const updateOrderById = async (req, res) => {
    try {
        const id = req.params.id;
        const updated_order = { status: "Confirm" };

        const final_order = await Order.findByIdAndUpdate(id, { $set: updated_order }, { new: true });

        if (!final_order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ message: "Order confirmed after payment!!", order: final_order });

    } catch (err) {
        res.status(500).json({ message: "Order is not updated!!", error: err.message });
    }
};


const getPendingOrder = async (req, res) => {
    try {
        const { bookId } = req.params;

        const pendingOrder = await Order.findOne({
            user: req.userID,
            book: bookId,
            status: "Pending",
        });

        return res.status(200).json({
            order: pendingOrder,
        });

    } catch (err) {
        console.error("Get pending order error:", err);

        return res.status(500).json({
            message: "Unable to fetch pending order",
        });
    }
};



module.exports = {createOrder, updateOrderById, getOrderById, getPendingOrder};