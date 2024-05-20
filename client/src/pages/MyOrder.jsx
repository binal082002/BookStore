import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import {toast} from "react-toastify"

const MyOrder = () =>{

    const {user} = useAuth();

    const [orders,setOrders] = useState([]);
    const [book, setBook] = useState([]);

    const params = useParams();
    const {authToken} = useAuth();

    //get singl user data
    const getOrderData = async() => {
        try{
            const response = await fetch(`http://localhost:5000/api/auth/order/${params.id}/detail`,{
                method : "GET",
                headers : {
                    Authorization : authToken,
                }
            });

            const res_data = await response.json();
            // console.log(res_data.data);
            setOrders(res_data.data);

        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        getOrderData();
    },[])

    const getBookData = async (id) => {
        try{

            const response = await fetch(`http://localhost:5000/api/store/book/${id}`,{
                method : "GET",
                headers : {
                    Authorization : authToken
                }
            });

            const res_data = await response.json();
            return res_data.data;
        }
        catch(err)
        {
            console.log("No book found!!");
        }
    }

    useEffect(() => {
        const fetchDetails = async()=> {
            try{
                const bookPromises = orders.map(order => getBookData(order.book));
                const resolvedBook = await Promise.all(bookPromises);
                setBook(resolvedBook);
                // console.log(resolvedBook);

            } catch(error)
            {
                console.error(error);
                toast.error("Failed to fetch data");
            }
        };

        fetchDetails();
    }, [orders,authToken]);

    return (
        <>
        <section className="admin-users-secion">
            <div className="container">
                <h1> Orders Data</h1>
            </div>

            <div className="container admin-users">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Books</th>
                            <th>Total_Amount</th>
                            <th>Order Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            book.map( (book, index)=>{
                                return <tr key={index}> 
                                    <td>{orders[index].orderDate}</td>

                                    <td> {book.title}</td>
                                    <td>{orders[index].totalAmount}</td>
                                    <td>{orders[index].status}</td>

                                    {/* <td><button onClick={() => deleteContact(curContact._id)}> Delete </button></td> */}
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

export default MyOrder;