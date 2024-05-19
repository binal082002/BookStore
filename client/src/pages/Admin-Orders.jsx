import { useEffect, useState } from "react";
import {useAuth} from "../store/auth";
import { toast } from "react-toastify";

const AdminOrders = () =>{

    const {authToken} = useAuth();
    const [orders,setOrders] = useState([]);
    const [bookDetails, setBookDetails] = useState([]);
    const [userDetails, setUserDetails] = useState([]);


    const getAllOrders = async() => {
        try{
            const response = await fetch('https://bookstore-chj2.onrender.com/api/admin/orders',{
                method : "GET",
                headers : {
                    Authorization : authToken,
                }
            });

            const res_data = await response.json();
            setOrders(res_data.message)
            // console.log("data on Admin order panel", res_data);

        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        getAllOrders();
    }, [])

    const getBookData = async(id) => {
        try{
            const response = await fetch(`https://bookstore-chj2.onrender.com/api/store/book/${id}`,{
                method : "GET",
                headers : {
                    Authorization : authToken,
                }
            });

            const res_data = await response.json();
            return res_data.data;

        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const bookDetailsPromises = orders.map(order => getBookData(order.book));
                const resolvedBookDetails = await Promise.all(bookDetailsPromises);
                setBookDetails(resolvedBookDetails);

                // const userDetailsPromise = orders.map(order => getUserData(order.user));
                // const resolvedUserDetails = await Promise.all(userDetailsPromise);
                // setUserDetails(resolvedUserDetails);

                // console.log(bookDetails);

            } catch (error) {
                console.error(error);
                toast.error("Failed to fetch book data");
            }
        };

        fetchDetails();
    }, [orders, authToken]);


    return (
        <>
            <section className="admin-users-secion">
                <div className="container">
                    <h1>Admin Orders Data</h1>
                </div>

                <div className="container admin-users">
                    <table>
                        <thead>
                            <tr>
                                <th>User_id</th>
                                <th>Books</th>
                                <th>Total_Amount</th>
                                <th>Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            {bookDetails.map((book, index) => (
                                <tr key={index}>
                                    <td>{orders[index].user}</td>
                                    <td> {book.title} </td>
                                    <td>{orders[index].totalAmount}</td>
                                    <td>{orders[index].status}</td>
                                </tr>
                            ))}
                        </tbody>

                        {/* <tbody>
                            {
                                orders.map( (curOrder, index)=>{
                                    // const book_data = await getBookData(curOrder.book);
                                    return <tr key={index}> 
                                        <td>{curOrder.user}</td>
                                        <td> {"hhh"}</td>
                                         <td>
                                            <ul>
                                                {curOrder.book.map((book, bookIndex) => (
                                                    <li key={bookIndex}>{book}</li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td>{curOrder.totalAmount}</td>
                                        <td>{curOrder.status}</td>
                                    </tr>
                                })
                            }
                        </tbody> */}
                    </table>
                </div>
            </section>
        </>
    )

}

export default AdminOrders;