import { useEffect, useState } from "react";
import {useAuth} from "../store/auth";
import {Link} from "react-router-dom"
import { toast } from "react-toastify";

const AdminUsers = () =>{
    const {authToken} = useAuth();
    const [users,serUsers] = useState([]);

    const getAllUsersData = async() => {
        try{
            const response = await fetch('http://localhost:5000/api/admin/users',{
                method : "GET",
                headers : {
                    Authorization : authToken,
                }
            });

            const res_data = await response.json();
            serUsers(res_data.message)
            // console.log("data on Admin user panel", res_data);

        }catch(err){
            console.log(err);
        }
    }

    //delete user through deletebutton and given id
    const deleteUser = async(id) => {
        try{
            const response = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`,{
                method : "DELETE",
                headers : {
                    Authorization : authToken,
                }
            });

            const res_data = await response.json();
            // console.log("data on Admin user panel After deletion", res_data);

            if(response.ok){
                toast.success("User deleted!!")
                getAllUsersData();
            }else{
                toast.error("No deletion!!")
            }

        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        getAllUsersData();
    }, [])


    return (
        <>

            <section className="admin-users-secion">
                <div className="container">
                    <h1>Admin Users Data</h1>
                </div>

                <div className="container admin-users">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                users.map((curUser, index)=>{
                                    return <tr key={index}> 
                                        <td>{curUser.username}</td>
                                        <td>{curUser.email}</td>
                                        <td>{curUser.phone}</td>
                                        <td><Link to = {`/admin/users/${curUser._id}/edit`}>Edit</Link></td>
                                        <td><button onClick={() => deleteUser(curUser._id)}> Delete </button></td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </section>
            
        </>
    )

}

export default AdminUsers;