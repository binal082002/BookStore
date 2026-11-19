const express = require("express");
const router = express.Router();
const order_controller = require("../controllers/order-controller");
const authMiddleware = require("../middlewares/auth-middleware");

router.route("/order").post(authMiddleware, order_controller.createOrder);
router.route("/order/pending/:bookId").get(authMiddleware, order_controller.getPendingOrder);
router.route("/order/:id").get(order_controller.getOrderById);
router.route("/order/update/:id").patch(order_controller.updateOrderById);

module.exports = router;
