import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import {toast} from "react-toastify"

const Order = () =>{

    const {user} = useAuth();

    const [book,setBook] = useState([]);

    const params = useParams();
    const {authToken} = useAuth();

    //get singl user data
    const getBookData = async() => {
        try{
            const response = await fetch(`https://bookstore-chj2.onrender.com/api/store/book/${params.id}`,{
                method : "GET",
                headers : {
                    Authorization : authToken,
                }
            });

            const res_data = await response.json();
            setBook(res_data.data);

        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        getBookData();
    },[])

    //to display updated data
    const handleSubmit = async(e) => {
        e.preventDefault(); // prevent default form submission behavior

        const order = {
            user : user._id,
            book : book._id,
            totalAmount : book.price,
            status : "Pending",
        };

        try{
            const response = await fetch(`https://bookstore-chj2.onrender.com/api/create/order`,{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                     Authorization : authToken,
                },
                body : JSON.stringify(order),
            });

            if(response.ok){
                toast.success("Order saved Successfully Successfully!");
            }else {
                toast.error("Order not confirmed!");
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
                                <h1 className="main-heading">Order Details</h1>
                                <br/>

                                <form onSubmit={handleSubmit}>

                                    <div>
                                        <label htmlFor="username">Username</label>
                                        <input id="username" value = {user.username} />
                                    </div>

                                    <div>
                                        <label htmlFor="email">email</label>
                                        <input id="email" value = {user.email} />
                                    </div>

                                    <div>
                                        <label htmlFor="phone">Book_title</label>
                                        <input  id="title" value = {book.title} />
                                    </div>

                                    <div>
                                        <label htmlFor="author">Author</label>
                                        <input id="author" value = {book.author} />
                                    </div>

                                    <div>
                                        <label htmlFor="amount">Amount</label>
                                        <input id="amount" value = {book.price} />
                                    </div>

                    

                                    <br />
                                    
                                    <button> Confirm </button>

                                </form>
                            </div>

                        </div>
                    </div>
                </main>
            </section>
        </>
    )
}

export default Order;