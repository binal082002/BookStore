const Order = require("../models/order-model");
const Book = require("../models/book-model");

const orders = async(req,res) => {
    try{
        const response = req.body;        
        await Order.create(response);
        console.log(response);
        res.status(200).json({message : "Order saved successfully!!"});
    }catch(err){
        res.status(500).json({message : "Order is not confimed!!"});
    }
} 

module.exports = orders;