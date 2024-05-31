import { useSearchParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Payment_success = () => {
    const searchQuery = useSearchParams()[0];
    const referenceNum = searchQuery.get("reference");

    const id = localStorage.getItem("orderId");

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

    useEffect(() => {
        if (id) {
            updateOrderStatus();
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
