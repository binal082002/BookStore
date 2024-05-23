import { Link } from "react-router-dom";
import "./Navbar.css"
import {useAuth} from "../store/auth"

const Navbar = () => {

    const {isLoggedIn, isAdmin, user} = useAuth();
    console.log(user._id);

    return (
    <>
        <header>
            <div className = "navbar">
                <div className="nav-logo">
                    <img 
                    src="/images/logo.png" 
                    alt="" 
                    width="90"
                    height="80" />
                    <p> BookShelf</p>
                </div>

                <ul className="nav-menu">
                    <li> <Link style={{textDecoration: 'none'}} to = "/">Home</Link></li>
                    <li> <Link style={{textDecoration: 'none'}} to = "/about">About</Link></li>
                    <li> <Link style={{textDecoration: 'none'}} to = "/service">Service</Link></li>
                    <li> <Link style={{textDecoration: 'none'}} to = "/contact">Contact</Link></li>
                </ul>

                <div className="nav-login-cart">
                    {isLoggedIn ? 
                    ( 
                        <>
                            <Link style={{textDecoration: 'none'}} to='/logout'><button>Logout</button></Link>
                            <Link style={{textDecoration: 'none'}} to={`/Myorder/${user._id}/detail`}><button>My orders</button></Link>
                        </>

                    ) : (
                        <>
                            <Link style={{textDecoration: 'none'}} to='/login'><button>Login</button></Link>
                            <Link style={{textDecoration: 'none'}} to='/register'><button>Register</button></Link>
                        </>

                    )}
                </div>
            </div>

        </header>

    </>
    )
}

export default Navbar;


// import React, { useContext, useRef, useState } from 'react'
// import './Navbar.css'
// import logo from '../Assets/logo.png'
// import cart_icon from '../Assets/cart_icon.png'
// import { Link } from 'react-router-dom'
// import { ShopContext } from '../../Context/ShopContext'
// import nav_dropdown from '../Assets/nav_dropdown.png'

// const Navbar = () => {
//     const[menu,setMenu]= useState("shop");
//     const {getTotalCartItems} = useContext(ShopContext);
//     const menuRef = useRef();
//     const dropdown_toggle = (e) =>{
//         menuRef.current.classList.toggle('nav-menu-visible');
//         e.target.classList.toggle('open');
//     }
//   return (
//     <div className='navbar'>
//         <div className="nav-logo">
//             <img src={logo} alt="" />
//             <p> Shopper</p>
//         </div>
//         <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
//         <ul ref={menuRef} className="nav-menu">
//             <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration: 'none'}} to='/'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
//             <li onClick={()=>{setMenu("mens")}}><Link style={{textDecoration: 'none'}} to='/mens'>Men</Link>{menu==="mens"?<hr/>:<></>}</li>
//             <li onClick={()=>{setMenu("womens")}}><Link style={{textDecoration: 'none'}} to='/womens'>Women</Link>{menu==="womens"?<hr/>:<></>}</li>
//             <li onClick={()=>{setMenu("kids")}}><Link style={{textDecoration: 'none'}} to='/kids'>Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
//         </ul>
//         <div className="nav-login-cart">
//             {localStorage.getItem('auth-token')?
//             <button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>:
//             <Link style={{textDecoration: 'none'}} to='/login'><button>Login</button></Link>}
//             <Link style={{textDecoration: 'none'}} to='/cart'><img src={cart_icon} alt="" /></Link>
//             <div className="nav-cart-count">{getTotalCartItems()}</div>
//         </div>
//     </div>
//   )
// }
// export default Navbar