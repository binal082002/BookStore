import { useSearchParams } from "react-router-dom";

const Payment_success = () => {
    const searchQuery = useSearchParams()[0];
    const referenceNum = searchQuery.get("reference");

    const {order_id} = useAuth();

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
