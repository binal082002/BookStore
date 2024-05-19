import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Register from "./pages/Register"
import Service from "./pages/Service"
import Login from "./pages/Login"
import Logout from "./pages/Logout"
import Book from "./pages/Book"

import Error from "./pages/Error"

import Navbar from "./Components/Navbar"
import Footer from "./Components/Footer/Footer"
import AdminLayout from "./Components/layouts/Admin-Layout";
import AdminUsers from "./pages/Admin-Users";
import AdminContacts from "./pages/Admin-Contacts";
import AdminOrders from "./pages/Admin-Orders";
import AdminAddBook from "./pages/Admin-Book";
import AdminUpdate from "./pages/Admin-Update";
import OrderDetail from "./pages/OrderDetail";
import MyOrder from "./pages/MyOrder";

const App = () => {
  return(
  <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/about" element = {<About />} />
        <Route path = "/book" element = {<Book />} />
        <Route path = "/contact" element = {<Contact/>} />
        <Route path = "/register" element = {<Register />} />
        <Route path = "/service" element = {<Service />} />
        <Route path = "/login" element = {<Login />} />
        <Route path = "/logout" element = {<Logout />} />
        <Route path = "/order/:id" element = {<OrderDetail />} />
        <Route path = "/Myorder/:id/detail" element = {<MyOrder />} />

        <Route path = "*" element = {<Error />} />

        <Route path = "/admin" element = {<AdminLayout/>}>
          <Route path = "users" element = {<AdminUsers />}/>
          <Route path = "contacts" element = {<AdminContacts/>}/>
          <Route path = "orders" element = {<AdminOrders/>}/>
          <Route path = "users/:id/edit" element = {<AdminUpdate/>}/>
          <Route path = "add/book" element = {<AdminAddBook/>}/>
        </Route>  

      </Routes>
    </BrowserRouter>

    {/* <Footer /> */}

     
  </>
);

}

export default App;