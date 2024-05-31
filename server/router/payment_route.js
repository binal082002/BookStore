const express = require("express");
const router = express.Router();
const payment_controller = require("../controllers/payment_controller");

router.route("/checkout").post(payment_controller.checkout);
router.route("/verification").post(payment_controller.verification);

module.exports = router;