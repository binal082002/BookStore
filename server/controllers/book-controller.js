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

const updateBookById = async(req,res) => {
    try {
        const id = req.params.id;
        // console.log(id);
        
        const book = await Book.findOne({_id : id})

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        const update_stock = book.stock - 1;

        if(update_stock == 0 ) {
            await Book.deleteOne({_id : id});
            console.log("Book deleted as stock is unavailable!!");
        }

        if(update_stock < 0)  return res.status(400).json({ message: "Book stock is over!!" });

        const update_book = {stock : update_stock}
        const final_book = await Book.updateOne({_id : id}, {$set : update_book})

        res.status(200).json({ message: "Book count updated!!", Book: final_book });

    } catch (err) {
        res.status(500).json({ message: "Book count is not updated!!", error: err.message });
    }
}


module.exports = {getAllBooks, getBookById, updateBookById};