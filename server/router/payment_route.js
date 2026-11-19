const express = require("express");
const router = express.Router();
const payment_controller = require("../controllers/payment_controller");
const authMiddleware = require("../middlewares/auth-middleware");

router.route("/checkout").post(authMiddleware, payment_controller.checkout);
router.route("/verification").post(payment_controller.verification);

module.exports = router;