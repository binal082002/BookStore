import { NavLink, Navigate, Outlet } from "react-router-dom";
import {FaUser, FaRegListAlt, FaHome} from "react-icons/fa";
import {FaMessage} from "react-icons/fa6"
import {useAuth} from "../../store/auth"
import { toast } from "react-toastify";

const AdminLayout = () =>{

    const {user, isLoading} = useAuth();

    if(isLoading){
        return <h1> Loading ...</h1>
    }

    if(!user.isAdmin){ //if user is not an admin reditect to home page
        toast.error("Acess deniend!")
        return <Navigate to = "/"/>
    }

    return (
        <>
            <header>
                <div className="container">
                    <nav>
                        <ul>
                            <li>
                                <NavLink to = "/admin/users">
                                    <FaUser /> users
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to = "/admin/contacts">
                                    <FaMessage /> contacts
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to = "/admin/orders">
                                <FaRegListAlt />   Orders
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to = "/admin/add/book">
                                <FaRegListAlt />   Add Book
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