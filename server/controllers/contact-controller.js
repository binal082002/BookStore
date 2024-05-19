const Contact = require("../models/contact-model");

const contactForm = async (req,res) =>{
    try{
        const response = req.body;
        await Contact.create(response);//here Contact is collection in which we are storing data writtern by user in database
        res.status(200).json({message : "Message saved successfully!"});

    }catch(err){
        res.status(500).json({message : "Message not delivered!"});
    }
}

module.exports = contactForm;