import { useState } from "react";
import {useAuth} from "../store/auth";
import { toast } from "react-toastify";

const Contact = () => {

    const defaultContactForm = {
        username : "",
        email : "",
        message : ""
    };

    const [contact , setContact] = useState(defaultContactForm);

    const [userData, setUserData] = useState(true)
    const {user} = useAuth();

    if(userData && user){
        setContact({
            username : user.username,
            email : user.email,
            message : "",
        })

        setUserData(false);
    }

    const handleInput = (e) =>{
        const name = e.target.name;
        const value = e.target.value;

        setContact({
            ...contact,
            [name] : value,
        });
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        try{

            const response = await fetch('https://bookstore-fd4d.onrender.com/api/form/contact', {
                method : "POST",
                headers : { "Content-Type" : "application/json"},
                body : JSON.stringify(contact),
            })

            if(response.ok){
                // const res_data = await response.json();
                setContact(defaultContactForm);
                // console.log("contact page" , res_data)
                toast.success("Message saved successfully!!");
            }

        }catch(err){
            console.error(err);
        }
    }

    return (
        <>
            <div className = "loginsignup">
                <div className = "container grid grid-two-cols">
                    <div className = "contact-img">
                        <img
                        src = "/images/contact.png" 
                        alt = "Trying to Contact!"
                        width="500" 
                        height="500"
                        />
                    </div>

                    <div className="loginsignup-container">
                        <h1>Contact Us</h1>
                        
                        <div className="loginsignup-fields">
                            {/* <label htmlFor="username">username</label> */}
                            <input 
                                type="text" 
                                name="username"
                                placeholder="" 
                                id="username"
                                required
                                autoComplete="off"
                                value = {contact.username}
                                onChange = {handleInput}
                            />

                            {/* <label htmlFor="email">email</label> */}
                            <input 
                                type="email" 
                                name="email"
                                placeholder="" 
                                id="email"
                                required
                                autoComplete="off"
                                value = {contact.email}
                                onChange = {handleInput}
                            />

                            {/* <label htmlFor="message">message</label> */}
                            <textarea 
                                name="message"
                                id="message"
                                placeholder="Leave your queries here!"
                                cols = "25"
                                rows =  "6"
                                value = {contact.message}
                                onChange = {handleInput}
                            > </textarea >
                        </div>
                            
                        <button onClick={handleSubmit}> Submit </button>
                    </div>
                </div>

            </div>
            <br/>
            <section className = "mb-3">
                <iframe
                    src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.4973993967487!2d72.62634057509705!3d23.18853697905787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c2a3c9618d2c5%3A0xc54de484f986b1fa!2sDA-IICT!5e0!3m2!1sen!2sin!4v1711559050687!5m2!1sen!2sin"
                    width = "100%"
                    height = "450"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                
                ></iframe>
            </section>
        </>
    )
}

export default Contact;

// import { useState } from "react";
// import { useAuth } from "../store/auth";

// const defaultContactFormData = {
//   username: "",
//   email: "",
//   message: "",
// };

// // type UserAuth = boolean;
// const Contact = () => {
//   const [data, setData] = useState(defaultContactFormData);

//   const { user } = useAuth();

//   console.log("frontend user ", user.email);

//   const [userData, setUserData] = useState(true);

//   if (userData && user) {
//     setData({
//       username: user.username,
//       email: user.email,
//       message: "",
//     });
//     setUserData(false);
//   }

//   const handleInput = (e) => {
//     // console.log(e);
//     const name = e.target.name;
//     const value = e.target.value;
//     setData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleContactForm = async (e) => {
//     e.preventDefault();
//   };

//   return (
//             <>
//                  <section>
//                     <main>
//                         <div className = "section-contact">
//                             <div className = "container grid grid-two-cols">
//                                 <div className = "contact-img">
//                                     <img 
//                                     src = "/images/contact.png" 
//                                     alt = "Trying to Contact!"
//                                     width="500" 
//                                     height="500"
//                                     />
//                                 </div>
    
//                                 <div className="section-form">
//                                     <h1 className="main-heading">Contact Us</h1>
//                                     <br/>
    
//                                     <form onSubmit = {handleContactForm}>
    
//                                         <div>
//                                             <label htmlFor="username">username</label>
//                                             <input 
//                                                 type="text" 
//                                                 name="username"
//                                                 placeholder="" 
//                                                 id="username"
//                                                 required
//                                                 autoComplete="off"
//                                                 value = {data.username}
//                                                 onChange = {handleInput}
//                                             />
//                                         </div>
    
//                                         <div>
//                                             <label htmlFor="email">email</label>
//                                             <input 
//                                                 type="email" 
//                                                 name="email"
//                                                 placeholder="" 
//                                                 id="email"
//                                                 required
//                                                 autoComplete="off"
//                                                 value = {data.email}
//                                                 onChange = {handleInput}
//                                             />
//                                         </div>
    
//                                         <div>
//                                             <label htmlFor="message">message</label>
//                                             <textarea 
//                                                 name="message"
//                                                 id="message"
//                                                 cols = "30"
//                                                 rows =  "6"
//                                                 value = {data.message}
//                                                 onChange = {handleInput}
//                                             > </textarea >
//                                         </div>
    
//                                         <br />
                                        
//                                         <button> Submit </button>
    
    
//                                     </form>
//                                 </div>
    
//                             </div>
//                         </div>
//                     </main>
                    
//                     <section className = "mb-3">
//                         <iframe
//                             src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.4973993967487!2d72.62634057509705!3d23.18853697905787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c2a3c9618d2c5%3A0xc54de484f986b1fa!2sDA-IICT!5e0!3m2!1sen!2sin!4v1711559050687!5m2!1sen!2sin"
//                             width = "100%"
//                             height = "450"
//                             allowFullScreen
//                             loading="lazy"
//                             referrerPolicy="no-referrer-when-downgrade"
                        
//                         ></iframe>
//                     </section>
    
    
//                 </section>
    
//             </>
//         )
// };

// export default Contact;
