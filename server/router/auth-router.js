const express = require("express");
const router = express.Router();
const authContollers = require("../controllers/auth-controllers");

const {signup_schema, login_schema} = require("../validator/auth-validator");

const val_middleware = require("../middlewares/validate-middleware");
const authMiddleware = require("../middlewares/auth-middleware")
// router.route("/").get((req,res) => {
//     res
//     .status(200)
//     .send("Welcome to router  !!")
// })

// router.route("/register").get((req,res) => {
//     res
//     .status(200)
//     .send("Welcomffe to router register!!")
// }) 

router.route("/").get(authContollers.home);
// before registration we need to check that data entered is compatible with signup_schema or not and same for login.
router.route("/register").post(val_middleware(signup_schema), authContollers.register);
router.route("/login").post(val_middleware(login_schema), authContollers.login);
router.route('/user').get(authMiddleware, authContollers.user);
router.route('/order/:id/detail').get(authMiddleware, authContollers.order);

module.exports = router;
