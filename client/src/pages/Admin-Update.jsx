import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import {toast} from "react-toastify"

const AdminUpdate = () =>{
    // return <h1>jibfie</h1>
    const [data, setData] = useState({
        username : "",
        email : "",
        phone : "",
    });

    const params = useParams();
    const {authToken} = useAuth();

    //get singl user data
    const getSingleUserData = async() => {
        try{
            const response = await fetch(`http://localhost:5000/api/admin/users/${params.id}`,{
                method : "GET",
                headers : {
                    Authorization : authToken,
                }
            });

            const res_data = await response.json();
            // console.log("data on Admin user panel at update page", res_data);
            setData(res_data.data);

        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        getSingleUserData();
    },[])
    
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setData({
            ...data,
            [name] : value,
        })
    };

    //to display updated data
    const handleSubmit = async(e) => {
        e.preventDefault(); // prevent default form submission behavior

        try{

            const response = await fetch(`http://localhost:5000/api/admin/users/update/${params.id}`,{
                method : "PATCH",
                headers : {
                    "Content-Type" : "application/json",
                     Authorization : authToken,
                },
                body : JSON.stringify(data),
            });

            if(response.ok){
                toast.success("Updated Successfully!");
            }else {
                toast.error("Not Updated!");
            }

        }catch(err){
            console.log(err);
        }
    }


    return (
        <>
            <section>
                <main>
                    <div className = "section-contact">
                        <div className = "container grid grid-two-cols">

                            <div className="section-form">
                                <h1 className="main-heading">Update User</h1>
                                <br/>

                                <form onSubmit={handleSubmit}>

                                    <div>
                                        <label htmlFor="username">username</label>
                                        <input 
                                            type="text" 
                                            name="username"
                                            placeholder="" 
                                            id="username"
                                            required
                                            autoComplete="off"
                                            value = {data.username}
                                            onChange = {handleInput}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email">email</label>
                                        <input 
                                            type="email" 
                                            name="email"
                                            placeholder="" 
                                            id="email"
                                            required
                                            autoComplete="off"
                                            value = {data.email}
                                            onChange = {handleInput}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phone">Mobile</label>
                                        <input 
                                            type="phone" 
                                            name="phone"
                                            placeholder="" 
                                            id="phone"
                                            required
                                            autoComplete="off"
                                            value = {data.phone}
                                            onChange = {handleInput}
                                        />
                                    </div>

                                    <br />
                                    
                                    <button> Update </button>


                                </form>
                            </div>

                        </div>
                    </div>
                </main>
            </section>
        </>
    )
}

export default AdminUpdate;