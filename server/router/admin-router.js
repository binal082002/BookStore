const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");


router.route("/users").get(authMiddleware, adminMiddleware, adminController.getAllUsers);
router.route("/users/:id").get(authMiddleware, adminMiddleware, adminController.getUsersById);
router.route("/users/update/:id").patch(authMiddleware, adminMiddleware, adminController.UpdateUsersById);
router.route("/users/delete/:id").delete(authMiddleware, adminMiddleware, adminController.deleteUserById);
router.route("/contacts").get(authMiddleware, adminMiddleware, adminController.getAllContacts);
router.route("/contacts/delete/:id").delete(authMiddleware, adminMiddleware, adminController.deleteContactById);
router.route("/add/book").post(authMiddleware, adminMiddleware, adminController.addBook);

router.route("/orders").get(authMiddleware, adminMiddleware, adminController.getAllOrders);
module.exports = router;