import { useEffect, useState } from "react";
import {useAuth} from "../store/auth";
import { toast } from "react-toastify";

const AdminContacts = () =>{
    const {authToken} = useAuth();
    const [contacts,seContacts] = useState([]);

    const getAllContacts = async() => {
        try{
            const response = await fetch('https://bookstore-fd4d.onrender.com/api/admin/contacts',{
                method : "GET",
                headers : {
                    Authorization : authToken,
                }
            });

            const res_data = await response.json();
            seContacts(res_data.message)
            // console.log("data on Admin contact panel", res_data);

        }catch(err){
            console.log(err);
        }
    }

    const deleteContact = async(id) => {
        try{
            const response = await fetch(`https://bookstore-fd4d.onrender.com/api/admin/contacts/delete/${id}`,{
                method : "DELETE",
                headers : {
                    Authorization : authToken,
                }
            });

            const res_data = await response.json();
            // console.log("data on Admin user panel After deletion", res_data);
            if(response.ok){
                toast.success("Cotact deleted!!")
                getAllContacts();
            }else{
                toast.error("No deletion!!")
            }

        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        getAllContacts();
    }, [])


    return (
        <>
            <section className="admin-users-secion">
                <div className="container">
                    <h1>Admin Contacts Data</h1>
                </div>

                <div className="container admin-users">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Message</th>
                                <th>Delete</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                contacts.map((curContact, index)=>{
                                    return <tr key={index}> 
                                        <td>{curContact.username}</td>
                                        <td>{curContact.email}</td>
                                        <td>{curContact.message}</td>
                                        <td><button onClick={() => deleteContact(curContact._id)}> Delete </button></td>
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

export default AdminContacts;