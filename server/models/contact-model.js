const {Schema, model, default:mongoose} = require("mongoose");

const contact_schema = new Schema({
    username : { type : String, require : true},
    email : { type : String, require : true},
    message : { type : String, require : true},
});

//create model/collection for contact page

const Contact = new model('Contact', contact_schema);
module.exports = Contact;