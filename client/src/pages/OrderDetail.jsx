// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useAuth } from "../store/auth";
// import { toast } from "react-toastify";

// const Order = () => {
//   const { user } = useAuth();

//   const [book, setBook] = useState({});

//   const params = useParams();
//   const { authToken } = useAuth();

//   // Get single user data
//   const getBookData = async () => {
//     try {
//       const response = await fetch(
//         `https://bookstore-fd4d.onrender.com/api/store/book/${params.id}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: authToken,
//           },
//         }
//       );

//       const res_data = await response.json();
//       setBook(res_data.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     getBookData();
//   }, []);

//   // To display updated data
//   const handleSubmit = async (e) => {
//     e.preventDefault(); // prevent default form submission behavior

//     const order = {
//       user: user._id,
//       book: book._id,
//       totalAmount: book.price,
//       status: "Pending",
//     };

//     try {
//       const response = await fetch(
//         `https://bookstore-fd4d.onrender.com/api/create/order`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: authToken,
//           },
//           body: JSON.stringify(order),
//         }
//       );

//       if (response.ok) {
//         toast.success("Order saved successfully!");
//       } else {
//         toast.error("Order not confirmed!");
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handlePay = async() => {
//     e.preventDefault(); // prevent default form submission behavior

//     try{
//         const response = await fetch("http://localhost:5000/api/payment/checkout",
//           {
//               method: "POST",
//               headers : { "Content-Type" : "application/json"},                
//               body: JSON.stringify({amount : totalAmount})
//       })

//       const key_res = await fetch("http://localhost:5000/api/key",{
//           method : "GET"
//       });

//       const {key_id} = await key_res.json();
//       // console.log(key_id);

//       const res = await response.json();
//       // console.log(user.phone);

//       var options = {
//           key: key_id, // Enter the Key ID generated from the Dashboard
//           amount: res.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
//           currency: "INR",
//           name: "Binal",
//           description: "Test Transaction",
//           image: "/images/logo.png",
//           order_id: res.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
//           callback_url: "http://localhost:5000/api/payment/verification",
//           prefill: {
//               name: user.username,
//               email: user.email,
//               contact: user.phone
//           },
//           notes: {
//               "address": "Razorpay Corporate Office"
//           },
//           theme: {
//               "color": "#671b7d" //rgb(102, 6, 147),
//           }
//       };

//       var rzp1 = new window.Razorpay(options);
//       rzp1.open();
//     }catch(err){
//       toast.error("Payment Unsucessful!!");
//       console.log("Error in payment!!");
//     }
//   }

//   return (
//     <>
//       <section>
//         <main>
//           <div className="section-contact">
//             <div className="container grid grid-two-cols">
//               <div className="section-form">
//                 <h1 className="main-heading">Order Details</h1>
//                 <br />

//                 <form>
//                   <div className="input-like">
//                     <label htmlFor="username">Username</label>
//                     <div id="username" className="input-like-box">
//                       {user.username}
//                     </div>
//                   </div>

//                   <div className="input-like">
//                     <label htmlFor="email">Email</label>
//                     <div id="email" className="input-like-box">
//                       {user.email}
//                     </div>
//                   </div>

//                   <div className="input-like">
//                     <label htmlFor="title">Book Title</label>
//                     <div id="title" className="input-like-box">
//                       {book.title}
//                     </div>
//                   </div>

//                   <div className="input-like">
//                     <label htmlFor="author">Author</label>
//                     <div id="author" className="input-like-box">
//                       {book.author}
//                     </div>
//                   </div>

//                   <div className="input-like">
//                     <label htmlFor="amount">Amount</label>
//                     <div id="amount" className="input-like-box">
//                       {book.price}
//                     </div>
//                   </div>

//                   <br />

//                   <div>
//                     <button onClick = {handleSubmit}>Confirm</button>
//                     <button onClick = {handlePay} className="other-btn">Pay</button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </main>
//       </section>
//     </>
//   );
// };

// export default Order;

import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import Modal from "react-modal";

Modal.setAppElement('#root'); // This is important for accessibility reasons

const Order = () => {
  const { user } = useAuth();
  const [book, setBook] = useState({});
  const [showPayButton, setShowPayButton] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const {authToken} = useAuth();

  const params = useParams();

  // Get single book data
  // Get single book data
  useEffect(() => {
    const getBookData = async () => {
      try {
        const response = await fetch(
          `https://bookstore-fd4d.onrender.com/api/store/book/${params.id}`,
          {
            method: "GET",
            headers: {
              Authorization: authToken,
            },
          }
        );

        const res_data = await response.json();
        setBook(res_data.data);
      } catch (err) {
        console.log(err);
      }
    };

    getBookData();
  }, []);

  // To create and save order
  const handleSubmit = async (e) => {
    e.preventDefault();

    const order = {
      user: user._id,
      book: book._id,
      totalAmount: book.price,
      status: "Pending",
    };

    try {
      const response = await fetch(
        `https://bookstore-fd4d.onrender.com/api/create/order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authToken,
          },
          body: JSON.stringify(order),
        }
      );

      const res = await response.json();

      if (response.ok) {
        // setOrderId(res.order._id); // Update order ID
        localStorage.setItem("orderId", res.order._id); // Store order ID in local storage

        setShowPayButton(true);
        setModalIsOpen(true);
        toast.success("Order saved successfully!");
      } else {
        toast.error("Order not confirmed!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Handle payment
  const handlePay = async (e) => {
    e.preventDefault();

    const totalAmount = book.price; // ensure totalAmount is defined
    try {
          const response = await fetch("http://bookstore-fd4d.onrender.com/api/payment/checkout",
              {
                  method: "POST",
                  headers : { "Content-Type" : "application/json"},                
                  body: JSON.stringify({amount : totalAmount})
          })

          const key_res = await fetch("http://bookstore-fd4d.onrender.com/api/key",{
              method : "GET"
          });

          const {key_id} = await key_res.json();
          // console.log(key_id);

          const res = await response.json();
          // console.log(user.phone);

          var options = {
              key: key_id, // Enter the Key ID generated from the Dashboard
              amount: res.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
              currency: "INR",
              name: "Binal",
              description: "Test Transaction",
              image: "/images/logo.png",
              order_id: res.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
              callback_url: "http://bookstore-fd4d.onrender.com/api/payment/verification",
              prefill: {
                  name: user.username,
                  email: user.email,
                  contact: user.phone
              },
              notes: {
                  "address": "Razorpay Corporate Office"
              },
              theme: {
                  "color": "#671b7d" //rgb(102, 6, 147),
              }
          };

          var rzp1 = new window.Razorpay(options);
          rzp1.open();
    } catch (err) {
      toast.error("Payment Unsuccessful!!");
      console.log("Error in payment!!");
    }
  };

  return (
    <>
      <section>
        <main>
          <div className="section-contact">
            <div className="container grid grid-two-cols">
              <div className="section-form">
                <h1 className="main-heading">Order Details</h1>
                <br />

                <form>
                  <div className="input-like">
                    <label htmlFor="username">Username</label>
                    <div id="username" className="input-like-box">
                      {user.username}
                    </div>
                  </div>

                  <div className="input-like">
                    <label htmlFor="email">Email</label>
                    <div id="email" className="input-like-box">
                      {user.email}
                    </div>
                  </div>

                  <div className="input-like">
                    <label htmlFor="title">Book Title</label>
                    <div id="title" className="input-like-box">
                      {book.title}
                    </div>
                  </div>

                  <div className="input-like">
                    <label htmlFor="author">Author</label>
                    <div id="author" className="input-like-box">
                      {book.author}
                    </div>
                  </div>

                  <div className="input-like">
                    <label htmlFor="amount">Amount</label>
                    <div id="amount" className="input-like-box">
                      {book.price}
                    </div>
                  </div>

                  <br />

                  <div>
                    <button onClick={handleSubmit}>Confirm</button>
                  </div>
                </form>

                {showPayButton && (
                  <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    className="modal"
                    overlayClassName="modal-overlay"
                    contentLabel="Payment Modal"
                  >
                    <div className="modal-header">Proceed to Payment</div>
                    <div className="modal-buttons">
                      <button className="modal-button pay-button" onClick={handlePay}>
                        Pay
                      </button>
                      <button
                        className="modal-button cancel-button"
                        onClick={() => setModalIsOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </Modal>
                )}
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Order;

