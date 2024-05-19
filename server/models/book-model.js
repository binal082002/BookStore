const {Schema, model, default:mongoose} = require("mongoose");

const book_schema = new Schema({
    book_id : { type : String, require : true},
    title : { type : String, require : true},
    author : { type : String, require : true},
    isbn : { type : String, require : true},
    genre : { type : String, require : true},
    publication_year : { type : String, require : true},
    cover_image_url : { type : String, require : true},
    price : { type : Number, require : true},
    stock : { type : Number, require : true},

});

//create model/collection for contact page

const Book = new model('Book', book_schema);
module.exports = Book;