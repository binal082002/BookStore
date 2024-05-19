const express = require("express");
const router = express.Router();
const orders = require("../controllers/order-controller");

router.route("/order").post(orders);

module.exports = router;