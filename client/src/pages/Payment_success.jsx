import { useSearchParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Payment_success = () => {
    const searchQuery = useSearchParams()[0];
    const referenceNum = searchQuery.get("reference");

    const id = localStorage.getItem("orderId");
    const {authToken} = useAuth();

    const updateOrderStatus = async() => {
        try{
            const response = await fetch(`https://bookstore-fd4d.onrender.com/api/create/order/update/${id}`,{
                method : "PATCH",
            })

            if(response.ok) toast.success("Order confirmed with payment");
            else toast.error("Order not confirmed in database!!");

        }catch(err){
            console.log(err);
        }
    }

    const singleorderDetail = async() => {
        const response = await fetch(`https://bookstore-fd4d.onrender.com/api/create/order/${id}`,{
            method : "GET",
            headers : {
                Authorization : authToken,
            }
        })

        const res = await response.json();


        if(response.ok)
        {
            const book_id = res.order.book;

            // console.log("order detail" , book_id);

            const book_update = await fetch(`https://bookstore-fd4d.onrender.com/api/store/book/update/${book_id}`,{
                method : "PATCH",
            });

            if(book_update.ok)
            {
                const final_book_update = await book_update.json();
                // console.log("Book update", final_book_update);
                toast.success(final_book_update.message);
            }else{
                toast.error("book stock not updated!!");
            }

            
        }else{
            toast.error("order detail not fetched!!");
        }
    }

    useEffect(() => {
        if (id) {
            // updateOrderStatus();
            singleorderDetail();
            localStorage.removeItem("orderId");
        }
    }, []);

    return (
        <>
            <div className="admin-text">
                <h1>Order Successful!!</h1>
                <p>Reference Number: {referenceNum}</p>
                
            </div>
        </>
    );
};

export default Payment_success;
