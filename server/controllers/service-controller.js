const Service = require("../models/service-model");

const services = async(req, res) => {
    try{
        const response = await Service.find();

        if(!response){
            res.status(404).json({message : "No service found!"});
            return;
        }

        // console.log(response);
        return res.status(200).json({message : response})


    }catch(err){
        // next(err);
        console.log('error from the server : ${err}');
    }
}

module.exports = services;