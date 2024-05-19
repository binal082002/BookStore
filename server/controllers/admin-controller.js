const User = require("../models/user-model");
const Contact = require("../models/contact-model");
const Order = require("../models/order-model");
const Book = require("../models/book-model");

const getAllUsers = async(req, res) =>{
    try{
        const users = await User.find({},{password:0}); //find() method will return all users along with their data(except password) stored in database.

        if(!users || users.length===0){
            return res.status(404).json({message : "No Users found!!"});
        }

        return res.status(200).json({message : users});
    }catch(err){
        next(err);
    }
}

//get all order details:
const getAllOrders = async(req, res) =>{
    try{
        const orders = await Order.find({}); //find() method will return all users along with their data(except password) stored in database.

        if(!orders || orders.length===0){
            return res.status(404).json({message : "No Orders found!!"});
        }

        return res.status(200).json({message : orders});
    }catch(err){
        next(err);
    }
}

//user delete logic
const deleteUserById = async(req, res) =>{
    try{
        const id = req.params.id; //id that is passed in params by clicking on delete button
        await User.deleteOne({_id : id});
        return res.status(200).json({message : "User deleted successfully!"});

    }catch(err){
        next(err);
    }
}

//single user fetching who clicked on edit button
const getUsersById = async(req,res) => {
    try{
        const id = req.params.id; //id that is passed in params by clicking on delete button
        const data = await User.findOne({_id : id}, {password:0})
        return res.status(200).json({data});

    }catch(err){
        next(err);
    }
}

const UpdateUsersById = async(req, res) => {
    try{
        const id = req.params.id;
        const updatedUserData = req.body; //data on adminUpdate page entered by admin

        const updatedData = await User.updateOne({_id : id}, {$set : updatedUserData} );

        // console.log(updatedData)
        return res.status(200).json(updatedData);

    }catch(err){
        next(err);
    }
}

const getAllContacts = async(req,res) =>{
    try{

        const contacts = await Contact.find();

        if(!contacts || contacts.length===0){
            return res.status(404).json({message : "No Contact details found!!"});
        }

        return res.status(200).json({message : contacts});


    }catch(err){
        next(err);
    }
}

const deleteContactById = async(req,res) => {
    try{
        const id = req.params.id;
        await Contact.deleteOne({_id : id});
        return res.status(200).json({message : "Contact deleted successfully!"});

    }catch(err){
        next(err);
    }

}

const addBook = async(req,res) => {
    try{
        const response = req.body;
        await Book.create(response);
        res.status(200).json({message : "Book saved successfully!"});

    }catch(err){
        next(err);
    }
}

module.exports = {getAllUsers, getAllOrders, getAllContacts, deleteUserById, getUsersById, UpdateUsersById, deleteContactById, addBook};