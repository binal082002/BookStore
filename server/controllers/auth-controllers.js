const User = require("../models/user-model")
const bcrypt = require("bcryptjs");  
const Order = require("../models/order-model");

const home = async(req, res) => {
    try{
        res
        .status(200)
        .send("Welcome to the auth-controllers!!");
            
    } catch(error) {
        console.log(error);
    }
}

const register = async(req, res) => {
    try{
        console.log(req.body);

        const {username, email, phone, password} = req.body;
        
        const userExist = await User.findOne({ email});
        if(userExist) return  res.status(400).json({message : "Emial already exist!"});
        

        // //hash the password
        // const saltRound = 10;
        // const hash_password = await bcrypt.hash(password,saltRound)

        const user_created =  await User.create({username, email, phone, password});
        res.status(201).json(
        {
            message : "Registration Successful!", 
            token : await user_created.generateToken(), 
            userId : await user_created._id.toString(),
        });

    } catch(error) {
        // res.status(500).json("Internal server error!!");
        next(error);
    }
}

const login = async(req, res) => {
    try{
        const {email, password} = req.body;

        const user_exist = await User.findOne({email}); //user_exist contain complete user data
        if(!user_exist) return res.status(400).json({message : "Email does not exist, Register first!!"});

        //if user exist then we have to copmare password with saved password when user registered.

        const user_chk = await user_exist.comp_pass(password); //password that is entered by user on body is passes as an argument
        // const user_chk = await bcrypt.compare(password,user_exist.password);

        if(user_chk)
        {
            res.status(201).json({
                message : "Login Successful!", 
                token : await user_exist.generateToken(), 
                userId : await user_exist._id.toString(),
            });
        } 
        else res.status(401).json({message : "Invalid email or password!"});
            
    } catch(error) {
        // res.status(500).json("Internal server error!!")
        next(error);
    }
}

const user = async(req,res) => {
    try{
        const userData = req.user; //req.user has complete userData that we have defined in "auth-middleware" file.
        // console.log("user Data :", userData);

        return res.status(200).json({ userData})

    }catch(err){
        console.log("Error from the user route!");
    }
}

const order = async(req,res) => {
    try{
        const id = req.params.id;
        const data = await Order.find({user : id});
        // console.log("order detail : " , response);
        return res.status(200).json({data});

    }catch(err){
        // next(err);
        console.log("Error from the order route!");
    }
}

module.exports = {home, register, login, user, order}; 