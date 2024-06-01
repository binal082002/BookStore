const express = require("express");
const router = express.Router();
const order_controller = require("../controllers/order-controller");

router.route("/order").post(order_controller.createOrder);
router.route("/order/:id").get(order_controller.getOrderById);
router.route("/order/update/:id").patch(order_controller.updateOrderById);

module.exports = router;