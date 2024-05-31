const Order = require("../models/order-model");
const Book = require("../models/book-model");

const createOrder = async(req,res) => {
    try{
        const response = req.body;        
        const new_order = await Order.create(response);
        // console.log(response);
        res.status(200).json({order : new_order});
    }catch(err){
        res.status(500).json({message : "Order is not confimed!!"});
    }
} 

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


module.exports = {createOrder, updateOrderById};