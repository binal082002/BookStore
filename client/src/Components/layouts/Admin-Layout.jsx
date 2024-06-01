import { NavLink, Navigate, Outlet, useLocation } from "react-router-dom";
import {FaUser, FaRegListAlt, FaHome} from "react-icons/fa";
import {FaMessage} from "react-icons/fa6"
import {useAuth} from "../../store/auth"
import { toast } from "react-toastify";

const AdminLayout = () =>{
    const {user, isLoading} = useAuth();
    const location = useLocation();

    if(isLoading){
        return <h1> Loading ...</h1>
    }

    if(!user.isAdmin){ //if user is not an admin reditect to home page
        toast.error("Access denied!")
        return <Navigate to = "/"/>
    }

    return (
        <>
            {location.pathname === '/admin' && (
                <div className="admin-text">
                    <h1>Welcome to the admin panel</h1>
                </div>
            )}

            <header>
                <div className="container">
                    <nav>
                        <ul>
                            <li>
                                <NavLink to = "/admin/users">
                                    <FaUser /> Users
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to = "/admin/contacts">
                                    <FaMessage /> Contacts
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to = "/admin/orders">
                                    <FaRegListAlt /> Orders
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to = "/admin/add/book">
                                    <FaRegListAlt /> Add Book
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            <Outlet/>
        </>
    )
}

export default AdminLayout;
