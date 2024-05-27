const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const user_schema = new mongoose.Schema({
    username : {
        type : String,
        require : true,
    },

    email : {
        type : String,
        require : true,
    },

    phone : {
        type : String,
        require : true,
    },

    password : {
        type : String,
        require : true,
    },

    isAdmin : {
        type : Boolean,
        default : false,
    },

});

//secure the password with the bcrypt
//pre-method to do some task before defing the model, before stroring data to the databse 

user_schema.pre(`save`, async function(next){

    const user = this;

    if(!user.isModified("password")){
        next();
    }

    try{
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;
    }catch(error){
        next(error);
    }

})


//JSON Web Tokens
user_schema.methods.generateToken = async function(){
    try{
        return jwt.sign(
            {
                userId : this._id.toString(),
                email : this.email,
                isAdmin : this.isAdmin,
            }, //when we verify user thrugh the JWT token these 3 data(payload) will be shared!!
            process.env.JWT_SECRET_KEY,
            {
                expiresIn : "2h",
            }
        );
    }catch(error){
        console.error(error);
    }
};

//method to compare password while login
user_schema.methods.comp_pass = async function(password){
    return bcrypt.compare(password, this.password);
    // const user = this;
    // const user_chk = await bcrypt.compare(password, user.password);

    // if(user_chk) return true;
    // return false;
}


// define the model or collection name
const User = new mongoose.model("User", user_schema)

module.exports = User;