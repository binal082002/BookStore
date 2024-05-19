const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book-controller")

router.route("/book").get(bookController.getAllBooks);
router.route("/book/:id").get(bookController.getBookById);


module.exports = router;