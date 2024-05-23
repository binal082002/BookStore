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
            <div className = "loginsignup">
                    <div className="container grid grid-two-cols">
                        <div className = "registration-image">
                            <img 
                            src = "/images/login.png" 
                            alt = "Trying to login!"
                            width="500" 
                            height="500"
                            />
                        </div>

                        <div className = "loginsignup-container">
                            <h1>Login</h1>

                            <div className="loginsignup-fields">
                                {/* <label htmlFor="email">Email</label> */}
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

                                    
                                {/* <label htmlFor="password">password</label> */}
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

                            <button onClick={handleSubmit}> Login Now </button>
                        </div>
                    </div>            
                </div>
        </>
    )
}

export default Login;



// import React, { useState } from 'react'
// import './CSS/LoginSignup.css'

// export const LoginSignup = () => {

//   const [state,setState] = useState("Login");
//   const [formData,setFormData] = useState({
//     username:"",
//     password:"",
//     email:""
//   })
  
//   const changeHandler = (e)=>{
//     setFormData({...formData,[e.target.name]:e.target.value})
//   }



//   const login =async ()=>{
//     console.log("Login Function Executed",formData);
//     let responseData;
//     // await fetch('http://localhost:4000/login',{
//     //   method:'POST',
//     //   headers:{
//     //     Accept:'application/formData',
//     //     'Content-type':'application/json',
//     //   },
//     //   body:JSON.stringify(formData),
//     // }).then((response)=>response.json()).then((data)=>responseData=data)

//     if(responseData.success){
//       localStorage.setItem('auth-token',responseData.token);
//       window.location.replace("/");
//     }
//     else{
//       alert(responseData.errors)
//     }
//   }
//   const signup =async ()=>{
//     console.log("Sign Up Function Executed",formData);
//     let responseData;
//     // await fetch('http://localhost:4000/signup',{
//     //   method:'POST',
//     //   headers:{
//     //     Accept:'application/formData',
//     //     'Content-type':'application/json',
//     //   },
//     //   body:JSON.stringify(formData),
//     // }).then((response)=>response.json()).then((data)=>responseData=data)

//     if(responseData.success){
//       localStorage.setItem('auth-token',responseData.token);
//       window.location.replace("/");
//     }
//     else{
//       alert(responseData.errors)
//     }
//   }

//   return (
//     <div className='loginsignup'>
//       <div className="loginsignup-container">
//         <h1>{state}</h1>
//         <div className="loginsignup-fields">
//           {state==="Sign Up"?<input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name'/>:<></>}
//           <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Your Email'/>
//           <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password'/>
//         </div>
//         <div className="loginsignup-agree">
//           <input type="checkbox" name='' id=''/>
//           <p>By continuing I agree to the T&C and Privacy Policy</p>
//         </div>
//         <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
//         {state==="Sign Up"?
//         <p className="loginsignup-login">Already Have an account?  <span onClick={()=>{setState("Login")}}>Login Here</span></p>:
//         <p className="loginsignup-login">Create an account?  <span onClick={()=>{setState("Sign Up")}}>Click Here</span></p>}
//       </div>
//     </div>
//   )
// }
// export default LoginSignup