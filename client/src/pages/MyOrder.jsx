import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import API_BASE_URL from "../utils/api";
import { useNavigate } from "react-router-dom";

const MyOrder = () => {
  const { authToken } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getOrderData = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(
          `${API_BASE_URL}/api/auth/order/${id}/detail`,
          {
            method: "GET",
            headers: {
              Authorization: authToken,
            },
          }
        );

        const resData = await response.json();

        if (!response.ok) {
          throw new Error(resData.message || "Unable to fetch orders.");
        }

        // Fetch book details for all orders
        const orderDetails = await Promise.all(
          (resData.data || []).map(async (order) => {
            try {
              const bookResponse = await fetch(
                `${API_BASE_URL}/api/store/book/${order.book}`,
                {
                  headers: {
                    Authorization: authToken,
                  },
                }
              );

              if (!bookResponse.ok) {
                return { ...order, bookDetails: null };
              }

              const bookData = await bookResponse.json();

              return {
                ...order,
                bookDetails: bookData.data,
              };
            } catch (error) {
              console.error("Book fetch error:", error);
              return { ...order, bookDetails: null };
            }
          })
        );

        const sortedOrders = orderDetails.sort(
          (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
        );

        setOrders(sortedOrders);
      } catch (error) {
        console.error("Order fetch error:", error);
        toast.error(error.message || "Failed to fetch orders.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id && authToken) {
      getOrderData();
    }
  }, [id, authToken]);

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatus = (status) => {
    if (status?.toLowerCase() === "pending") {
      return {
        label: "Pending",
        className: "bg-amber-50 text-amber-700 ring-amber-200",
      };
    }

    return {
      label: "Completed",
      className: "bg-green-50 text-green-700 ring-green-200",
    };
  };

  return (
    <main className="min-h-screen bg-[#fffdf9] px-5 py-12 sm:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Page heading */}
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#684477]">
            YOUR ACCOUNT
          </p>

          <h1 className="mt-3 text-3xl font-bold text-stone-900 sm:text-4xl">
            My Orders
          </h1>

          <p className="mt-3 text-stone-600">
            Keep track of your purchases and order status.
          </p>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="rounded-2xl border border-stone-200 bg-white px-6 py-16 text-center">
            <p className="font-medium text-stone-600">Loading your orders...</p>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && orders.length === 0 && (
          <div className="rounded-2xl border border-stone-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f3edf5] text-3xl">
              📚
            </div>

            <h2 className="mt-5 text-xl font-bold text-stone-900">
              No orders yet
            </h2>

            <p className="mt-2 text-stone-600">
              Your purchases will appear here once you place an order.
            </p>

            <a
              href="/book"
              className="mt-7 inline-block rounded-xl bg-[#684477] px-6 py-3 font-semibold text-white transition hover:bg-[#543563]"
            >
              Explore Books
            </a>
          </div>
        )}

        {/* Order list */}
        {!isLoading && orders.length > 0 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-stone-900">
                Order History
              </h2>

              <span className="rounded-full bg-[#f3edf5] px-3 py-1 text-sm font-semibold text-[#684477]">
                {orders.length} {orders.length === 1 ? "Order" : "Orders"}
              </span>
            </div>

            {orders.map((order) => {
              const status = getStatus(order.status);
              const book = order.bookDetails;

              const isPending = order.status?.toLowerCase() === "pending";

              const displayAmount = isPending
                ? Number(book?.price ?? order.totalAmount)
                : Number(order.totalAmount);

              return (
                <article
                  key={order._id}
                  className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:shadow-md"
                >
                  {/* Order header */}
                  <div className="flex flex-col gap-3 border-b border-stone-100 bg-stone-50/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-stone-500">
                        Order ID
                      </p>

                      <p className="mt-1 text-sm font-semibold text-stone-800">
                        #{order._id.slice(-8).toUpperCase()}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                      <p className="text-sm text-stone-500">
                        {formatDate(order.orderDate)}
                      </p>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${status.className}`}
                      >
                        {status.label}
                      </span>
                    </div>
                  </div>

                  {/* Order body */}
                  <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:px-6 sm:py-6">
                    <div className="flex h-32 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-stone-100">
                      {book?.cover_image_url ? (
                        <img
                          src={book.cover_image_url}
                          alt={book.title || "Book cover"}
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <span className="text-sm text-stone-400">No image</span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#684477]">
                        {book?.genre || "Book"}
                      </p>

                      <h3 className="mt-1 text-lg font-bold text-stone-900">
                        {book?.title || "Book details unavailable"}
                      </h3>

                      <p className="mt-1 text-sm text-stone-500">
                        {book?.author
                          ? `By ${book.author}`
                          : "Author unavailable"}
                      </p>
                    </div>

                    <div className="border-t border-stone-100 pt-4 sm:min-w-36 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                      <p className="text-sm text-stone-500">Total Amount</p>

                      <p className="mt-1 text-xl font-bold text-stone-900">
                        ₹{displayAmount.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>

                  {order.status?.toLowerCase() === "pending" && book && (
                    <div className="border-t border-stone-100 px-5 py-4 sm:px-6">
                      <button
                        onClick={() =>
                          navigate(`/order/${book._id}`, {
                            state: { existingOrderId: order._id },
                          })
                        }
                        className="rounded-lg bg-[#684477] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#543563]"
                      >
                        Continue Payment
                      </button>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default MyOrder;
