// import { Link } from "react-router-dom";
// import "./Navbar.css"
// import {useAuth} from "../store/auth"

// const Navbar = () => {

//     const {isLoggedIn, isAdmin, user} = useAuth();
//     console.log(user._id);

//     return (
//     <>
//         <header>
//             <div className = "navbar">
//                 <div className="nav-logo">
//                     <img 
//                     src="/images/logo.png" 
//                     alt="" 
//                     width="90"
//                     height="80" />
//                     <p> BookShelf</p>
//                 </div>

//                 <ul className="nav-menu">
//                     <li> <Link style={{textDecoration: 'none'}} to = "/">Home</Link></li>
//                     <li> <Link style={{textDecoration: 'none'}} to = "/about">About</Link></li>
//                     <li> <Link style={{textDecoration: 'none'}} to = "/admin">Admin</Link></li>
//                     <li> <Link style={{textDecoration: 'none'}} to = "/contact">Contact</Link></li>
//                 </ul>

//                 <div className="nav-login-cart">
//                     {isLoggedIn ? 
//                     ( 
//                         <>
//                             <Link style={{textDecoration: 'none'}} to='/logout'><button>Logout</button></Link>
//                             <Link style={{textDecoration: 'none'}} to={`/Myorder/${user._id}/detail`}><button>My orders</button></Link>
//                         </>

//                     ) : (
//                         <>
//                             <Link style={{textDecoration: 'none'}} to='/login'><button>Login</button></Link>
//                             <Link style={{textDecoration: 'none'}} to='/register'><button>Register</button></Link>
//                         </>

//                     )}
//                 </div>
//             </div>

//         </header>

//     </>
//     )
// }

// export default Navbar;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../store/auth';

const Navbar = () => {
  const { isLoggedIn, user } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <header>
      <div className="navbar">
        <div className="nav-logo">
          <img src="/images/logo.png" alt="Logo" width="90" height="80" />
          <p>BookShelf</p>
        </div>
        <img
          className="nav-dropdown"
          src="/images/nav_dropdown.png"
          alt="Menu"
          onClick={() => setMenuVisible(!menuVisible)}
        />
        <ul className={`nav-menu ${menuVisible ? 'nav-menu-visible' : ''}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/admin">Admin</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <div className="nav-login-cart">
          {isLoggedIn ? (
            <>
              <Link to="/logout"><button>Logout</button></Link>
              <Link to={`/Myorder/${user._id}/detail`}><button>My orders</button></Link>
            </>
          ) : (
            <>
              <Link to="/login"><button>Login</button></Link>
              <Link to="/register"><button>Register</button></Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;


