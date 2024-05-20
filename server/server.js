require('dotenv').config(); //to use all variables of env using "process.env"
const express = require("express");
const cors = require("cors");
const app = express();

const connectDB = require("./utils/db");
const errorMiddleware = require('./middlewares/error-middleware');

const contact_route = require("./router/contact-router")
const authRoute = require("./router/auth-router");
const service_route = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const bookRoute = require("./router/book-router");
const order_route = require("./router/order-router");

const corsOptions = {
    origin:  "http://localhost:5173",
    method : "GET, POST, PUT, DELETE, PATCH, HEAD",
    Credentials : true,
} //giving access to data coming from given origin URL(front-end) to go into database.

app.use(cors(corsOptions));//we need to define it before fetching the data
app.use(express.json());//Middleware to use json in this file

app.use("/api/auth", authRoute); //it direct to auth-router.js file.
app.use("/api/form",contact_route);
app.use("/api/data", service_route);
app.use("/api/store", bookRoute);
app.use("/api/create", order_route);

//define admin route
app.use("/api/admin", adminRoute);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {

    app.listen(PORT, () => {
    console.log(`Server is running at port : ${PORT}`)
})

});


// app.get("/",(req, res) => {
//     res.status(200).send("Welco  me to home page!!");
// }) //root Home page

// app.get("/register", (req,res) => {
//     res.status(200).send("Welcome to registration page!!");
// }) //converted this code using auth-router file
