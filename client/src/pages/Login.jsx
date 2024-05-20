import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../store/auth"
import {toast}  from "react-toastify"

const Login = () => {
    const [user, setUser] = useState({
        email : "",
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
        // console.log(user);

        try {
            const response = await fetch('https://bookstore-fd4d.onrender.com/api/auth/login', {
            method : "POST",
            headers : { "Content-Type" : "application/json"},
            body : JSON.stringify(user)
            });

            const res_data = await response.json(); //response will contain the data we passed in "res" through logic part of registration 
            // console.log("login-server data : ", res_data);
            if(response.ok){
                storeTokenInLS(res_data.token);
                // localStorage.setItem("Token" , res_data.token);

                
                toast.success("Login Successful!");
                setUser({email : "", password : ""});
                navigate("/"); //navigate to login page

            }else {
                toast.error(res_data.extraDetails ?  res_data.extraDetails : res_data.message);
                // console.log("Invalid Credentials!");
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
                                src = "/images/login.png" 
                                alt = "Trying to login!"
                                width="500" 
                                height="500"
                                />
                            </div>

                            <div className="registration-form">
                                <h1 className="main-heading mb-3">Login</h1>
                                <br/>

                                <form onSubmit = {handleSubmit}>

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
                                    
                                    <button type="Login" className ="btn btn-submit" > Login Now </button>


                                </form>
                            </div>

                        </div>
                    </div>
                </main>
            </section>
        </>
    )
}

export default Login;