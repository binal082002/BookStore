import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../store/auth"
import {toast} from "react-toastify"

const Register = () => {

    const [user, setUser] = useState({
        username : "",
        email : "",
        phone : "",
        password : ""
    });

    const navigate = useNavigate();
    const {storeTokenInLS} = useAuth();


    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name] : value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // alert(user);

        try{
            const response = await fetch('https://bookstore-fd4d.onrender.com/api/auth/register', {
            method : "POST",
            headers : { "Content-Type" : "application/json"},
            body : JSON.stringify(user)
            });

            const res_data = await response.json(); //response will contain the data we passed in "res" through logic part of registration 
            // console.log("Register-result from server",res_data);

            // console.log(response);
            if(response.ok){
            
                // localStorage.setItem(res_data.token);
                storeTokenInLS(res_data.token)

                toast.success("Registration Successful!");
                setUser({ username : "",email : "",phone : "", password : ""});
                navigate("/login"); //navigate to login page
            } //if user is registered successfully then empty the data from the screen.
            else{
                toast.error(res_data.extraDetails ?  res_data.extraDetails : res_data.message);
            }
        }catch(err){
            console.log(err);
        }
    }


    return (
        <>
            <section>
                <main>
                    <div className = "section-registration">
                        <div className = "container grid grid-two-cols">
                            <div className = "registration-image">
                                <img 
                                src = "/images/register.png" 
                                alt = "Trying to regiser!"
                                width="500" 
                                height="500"
                                />
                            </div>

                            <div className="registration-form">
                                <h1 className="main-heading mb-3">Registarion From</h1>
                                <br/>

                                <form onSubmit = {handleSubmit}>

                                    <div>
                                        <label htmlFor="username">username</label>
                                        <input 
                                            type="text" 
                                            name="username"
                                            placeholder="username" 
                                            id="username"
                                            required
                                            autoComplete="off"
                                            value = {user.username}
                                            onChange = {handleInput}

                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email">email</label>
                                        <input 
                                            type="email" 
                                            name="email"
                                            placeholder="Enter your email" 
                                            id="email"
                                            required
                                            autoComplete="off"
                                            value = {user.email}
                                            onChange = {handleInput}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phone">phone</label>
                                        <input 
                                            type="number" 
                                            name="phone"
                                            placeholder="phone" 
                                            id="phone"
                                            required
                                            autoComplete="off"
                                            value = {user.phone}
                                            onChange = {handleInput}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="password">password</label>
                                        <input 
                                            type="password" 
                                            name="password"
                                            placeholder="password" 
                                            id="password"
                                            required
                                            autoComplete="off"
                                            value = {user.password}
                                            onChange = {handleInput}
                                        />
                                    </div>

                                    <br />
                                    
                                    <button type="submit" className ="btn btn-submit" > Register Now </button>


                                </form>
                            </div>

                        </div>
                    </div>
                </main>
            </section>
        </>
    )
}

export default Register;