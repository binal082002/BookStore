const Book = require("../models/book-model")

const getAllBooks = async(req,res) =>{
    try{
        const response = await Book.find();

        if(!response){
            res.status(404).json({message : "No books found!"});
            return;
        }

        // console.log(response);
        return res.status(200).json({message : response});


    }catch(err){
        next(err);
    }

}

const getBookById = async(req,res) => {
    try{
        const id = req.params.id; //id that is passed in params by clicking on buy button
        const data = await Book.findOne({_id : id})
        return res.status(200).json({data});

    }catch(err){
        next(err);
    }
}


module.exports = {getAllBooks, getBookById};