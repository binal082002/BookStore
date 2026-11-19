import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import Modal from "react-modal";
import API_BASE_URL from "../utils/api";
import { useParams, useLocation } from "react-router-dom";

Modal.setAppElement("#root");

const Order = () => {
  const { user, authToken } = useAuth();
  const { id } = useParams();
  const location = useLocation();

  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [orderId, setOrderId] = useState(location.state?.existingOrderId || "");
  const [isExistingOrder, setIsExistingOrder] = useState(
    Boolean(location.state?.existingOrderId)
  );
  const [isCheckingPendingOrder, setIsCheckingPendingOrder] = useState(true);

  // Fetch selected book
  useEffect(() => {
    const getBookData = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(`${API_BASE_URL}/api/store/book/${id}`, {
          headers: {
            Authorization: authToken,
          },
        });

        const resData = await response.json();

        if (!response.ok) {
          throw new Error(resData.message || "Unable to fetch book details.");
        }

        setBook(resData.data);
      } catch (error) {
        console.error("Book fetch error:", error);
        toast.error(error.message || "Unable to load book.");
      } finally {
        setIsLoading(false);
      }
    };

    getBookData();
  }, [id, authToken]);

  // Check for an existing pending order
  useEffect(() => {
    const getPendingOrder = async () => {
      setIsCheckingPendingOrder(true);

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/create/order/pending/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: authToken,
            },
          }
        );

        const resData = await response.json();

        if (!response.ok) {
          throw new Error(resData.message || "Unable to check pending order.");
        }

        if (resData.order) {
          setOrderId(resData.order._id);
          setIsExistingOrder(true);
        } else {
          setOrderId("");
          setIsExistingOrder(false);
        }
      } catch (error) {
        console.error("Pending order check error:", error);
        toast.error("Unable to check your existing order.");
      } finally {
        setIsCheckingPendingOrder(false);
      }
    };

    if (id && authToken) {
      getPendingOrder();
    } else {
      setIsCheckingPendingOrder(false);
    }
  }, [id, authToken]);

  // Create order

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If an order was already created, reuse it instead of creating another.
    if (orderId) {
      setModalIsOpen(true);
      return;
    }

    if (!book?._id) {
      toast.error("Book details are unavailable.");
      return;
    }

    if (Number(book.stock) <= 0) {
      toast.error("This book is currently out of stock.");
      return;
    }

    try {
      setIsCreatingOrder(true);

      const response = await fetch(`${API_BASE_URL}/api/create/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
        body: JSON.stringify({ book: book._id }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || "Unable to create order.");
      }

      const createdOrderId = resData.order._id;
      setIsExistingOrder(response.status === 200);

      setOrderId(createdOrderId);
      localStorage.setItem("orderId", createdOrderId);

      setModalIsOpen(true);
      if (response.status === 200) {
        toast.info(
          "You already have a pending order. You can continue payment."
        );
      } else {
        toast.success("Order created successfully!");
      }
    } catch (error) {
      console.error("Create order error:", error);
      toast.error(error.message || "Something went wrong.");
    } finally {
      setIsCreatingOrder(false);
    }
  };

  // Initiate Razorpay payment
  const handlePay = async () => {
    if (!orderId) {
      toast.error("Order not found. Please try again.");
      return;
    }

    try {
      setIsPaying(true);

      const response = await fetch(`${API_BASE_URL}/api/payment/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
        body: JSON.stringify({ orderId }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || "Unable to initiate payment.");
      }

      const keyResponse = await fetch(`${API_BASE_URL}/api/key`);

      if (!keyResponse.ok) {
        throw new Error("Unable to fetch payment key.");
      }

      const { key_id } = await keyResponse.json();

      if (!window.Razorpay) {
        throw new Error("Payment service is unavailable. Please try again.");
      }

      const options = {
        key: key_id,
        amount: resData.order.amount,
        currency: "INR",
        name: "BookShelf",
        description: `Purchase: ${book.title}`,
        image: "/images/logo.png",
        order_id: resData.order.id,
        callback_url: `${API_BASE_URL}/api/payment/verification`,
        prefill: {
          name: user?.username || "",
          email: user?.email || "",
          contact: user?.phone || "",
        },
        theme: {
          color: "#684477",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
      setModalIsOpen(false);
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(error.message || "Unable to start payment.");
    } finally {
      setIsPaying(false);
    }
  };

  if (isLoading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#fffdf9]">
        <p className="text-lg font-medium text-stone-600">
          Loading book details...
        </p>
      </main>
    );
  }

  if (!book) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center bg-[#fffdf9] px-6 text-center">
        <h1 className="text-2xl font-bold text-stone-900">Book not found</h1>
        <p className="mt-3 text-stone-600">
          We couldn't find the book you're looking for.
        </p>
      </main>
    );
  }

  const isOutOfStock = Number(book.stock) <= 0;

  return (
    <main className="min-h-screen bg-[#fffdf9] px-6 py-12 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#684477]">
            YOUR PURCHASE
          </p>

          <h1 className="mt-3 text-3xl font-bold text-stone-900 sm:text-4xl">
            Order Details
          </h1>

          <p className="mt-3 text-stone-600">
            Review your details and selected book before proceeding.
          </p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-5">
          {/* Book details */}
          <section className="rounded-2xl border border-stone-200 bg-white p-7 shadow-sm lg:col-span-3">
            <h2 className="text-xl font-bold text-stone-900">Selected Book</h2>

            <div className="mt-7 flex flex-col gap-7 sm:flex-row">
              <div className="flex justify-center sm:w-2/5">
                <div className="flex h-72 w-52 items-center justify-center overflow-hidden rounded-xl bg-stone-100 p-3">
                  <img
                    src={book.cover_image_url}
                    alt={book.title}
                    className="h-full w-full rounded-lg object-contain"
                  />
                </div>
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium text-[#684477]">
                  {book.genre}
                </p>

                <h3 className="mt-2 text-2xl font-bold text-stone-900">
                  {book.title}
                </h3>

                <p className="mt-2 text-stone-600">By {book.author}</p>

                <p className="mt-5 text-2xl font-bold text-[#684477]">
                  ₹{Number(book.price).toLocaleString("en-IN")}
                </p>

                <p
                  className={`mt-3 text-sm font-semibold ${
                    isOutOfStock ? "text-red-600" : "text-green-700"
                  }`}
                >
                  {isOutOfStock ? "Out of stock" : "In stock"}
                </p>
              </div>
            </div>
          </section>

          {/* Customer details */}
          <section className="rounded-2xl border border-stone-200 bg-white p-7 shadow-sm lg:col-span-2">
            <h2 className="text-xl font-bold text-stone-900">
              Customer Details
            </h2>

            <div className="mt-7 space-y-6">
              <div>
                <p className="text-sm font-medium text-stone-500">Username</p>
                <p className="mt-1 font-semibold text-stone-900">
                  {user?.username || "Not available"}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-stone-500">
                  Email address
                </p>
                <p className="mt-1 break-all font-semibold text-stone-900">
                  {user?.email || "Not available"}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-stone-500">
                  Phone number
                </p>
                <p className="mt-1 font-semibold text-stone-900">
                  {user?.phone || "Not available"}
                </p>
              </div>
            </div>

            <div className="mt-8 border-t border-stone-200 pt-6">
              <div className="flex items-center justify-between">
                <span className="font-medium text-stone-600">Total amount</span>

                <span className="text-xl font-bold text-stone-900">
                  ₹{Number(book.price).toLocaleString("en-IN")}
                </span>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={
                  isCheckingPendingOrder || isCreatingOrder || isOutOfStock
                }
                className="mt-7 w-full rounded-xl bg-[#684477] px-6 py-3.5 font-semibold text-white transition hover:bg-[#543563] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isCheckingPendingOrder
                  ? "Checking order..."
                  : isCreatingOrder
                  ? "Creating order..."
                  : isOutOfStock
                  ? "Out of Stock"
                  : orderId
                  ? "Continue to Payment"
                  : "Confirm Order"}
              </button>
              {isOutOfStock && (
                <p className="mt-3 text-center text-sm text-red-600">
                  This book is currently unavailable. Payment cannot be
                  initiated.
                </p>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Payment confirmation modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="mx-auto mt-[25vh] w-[90%] max-w-md rounded-2xl bg-white p-7 shadow-xl outline-none"
        overlayClassName="fixed inset-0 z-[100] bg-black/50 px-4"
        contentLabel="Payment confirmation"
      >
        <h2 className="text-2xl font-bold text-stone-900">
          Proceed to Payment?
        </h2>

        <p className="mt-3 leading-7 text-stone-600">
          {isExistingOrder
            ? "Your previous pending order is ready. Continue to Razorpay to complete your purchase."
            : "Your order has been created successfully. Continue to Razorpay to complete your purchase."}
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handlePay}
            disabled={isPaying}
            className="flex-1 rounded-xl bg-[#684477] px-5 py-3 font-semibold text-white transition hover:bg-[#543563] disabled:opacity-60"
          >
            {isPaying ? "Please wait..." : "Proceed to Pay"}
          </button>

          <button
            type="button"
            onClick={() => setModalIsOpen(false)}
            disabled={isPaying}
            className="flex-1 rounded-xl border border-stone-300 px-5 py-3 font-semibold text-stone-700 transition hover:bg-stone-100"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </main>
  );
};

export default Order;
