import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import API_BASE_URL from "../utils/api";

const AdminOrders = () => {
  const { authToken } = useAuth();

  const [orders, setOrders] = useState([]);
  const [bookDetails, setBookDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingBooks, setIsLoadingBooks] = useState(false);
  const [error, setError] = useState("");

  const getBookData = async (bookId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/store/book/${bookId}`, {
        method: "GET",
        headers: {
          Authorization: authToken,
        },
      });

      if (!response.ok) {
        throw new Error("Unable to fetch book details");
      }

      const res_data = await response.json();
      return res_data.data;
    } catch (err) {
      console.error(`Book fetch error (${bookId}):`, err);
      return null;
    }
  };

  const getAllOrders = async () => {
    try {
      setIsLoading(true);
      setError("");
      setBookDetails({});

      const response = await fetch(`${API_BASE_URL}/api/admin/orders`, {
        method: "GET",
        headers: {
          Authorization: authToken,
        },
      });

      const res_data = await response.json();

      if (response.status === 404) {
        setOrders([]);
        return;
      }

      if (!response.ok) {
        throw new Error(res_data.message || "Unable to fetch orders.");
      }

      const fetchedOrders = Array.isArray(res_data.message)
        ? res_data.message
        : [];

      const sortedOrders = [...fetchedOrders].sort((a, b) => {
        const dateA = new Date(
          a.orderDate || a.createdAt || a.timestamp || 0
        ).getTime();

        const dateB = new Date(
          b.orderDate || b.createdAt || b.timestamp || 0
        ).getTime();

        return dateB - dateA;
      });

      setOrders(sortedOrders);

      // Fetch book details for all orders
      if (fetchedOrders.length > 0) {
        setIsLoadingBooks(true);

        const bookPromises = fetchedOrders.map(async (order) => {
          const bookId =
            typeof order.book === "object" ? order.book?._id : order.book;

          if (!bookId) {
            return [order._id, null];
          }

          const book = await getBookData(bookId);
          return [order._id, book];
        });

        const resolvedBooks = await Promise.all(bookPromises);

        setBookDetails(Object.fromEntries(resolvedBooks));
      }
    } catch (err) {
      console.error("Fetch orders error:", err);
      setError(err.message || "Unable to fetch orders.");
      toast.error(err.message || "Unable to fetch orders.");
    } finally {
      setIsLoading(false);
      setIsLoadingBooks(false);
    }
  };

  useEffect(() => {
    if (authToken) {
      getAllOrders();
    } else {
      setIsLoading(false);
    }
  }, [authToken]);

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(Number(amount) || 0);
  };

  const formatDate = (date) => {
    if (!date) return "Not available";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Not available";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-50 text-green-700 ring-green-600/20";

      case "pending":
        return "bg-amber-50 text-amber-700 ring-amber-600/20";

      case "cancelled":
        return "bg-red-50 text-red-700 ring-red-600/20";

      default:
        return "bg-stone-100 text-stone-600 ring-stone-500/20";
    }
  };

  const getShortId = (id) => {
    if (!id) return "N/A";
    return `#${String(id).slice(-8).toUpperCase()}`;
  };

  const getCustomerId = (user) => {
    const userId = typeof user === "object" ? user?._id : user;

    return getShortId(userId);
  };

  const completedOrders = orders.filter(
    (order) => order.status?.toLowerCase() === "completed"
  ).length;

  const pendingOrders = orders.filter(
    (order) => order.status?.toLowerCase() === "pending"
  ).length;

  const totalOrderValue = orders.reduce(
    (total, order) => total + (Number(order.totalAmount) || 0),
    0
  );

  return (
    <main className="mx-auto w-full max-w-7xl">
      {/* Page Heading */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-[#684477]">
            STORE MANAGEMENT
          </p>

          <h1 className="mt-2 text-3xl font-bold text-stone-900 sm:text-4xl">
            Orders
          </h1>

          <p className="mt-2 text-sm text-stone-500 sm:text-base">
            View customer purchases, order amounts and payment status.
          </p>
        </div>

        <button
          type="button"
          onClick={getAllOrders}
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-700 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-50 sm:self-auto"
        >
          <span>↻</span>
          {isLoading ? "Refreshing..." : "Refresh Orders"}
        </button>
      </div>

      {/* Overview Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Total Orders</p>

          <p className="mt-3 text-3xl font-bold text-stone-900">
            {orders.length}
          </p>

          <p className="mt-2 text-xs text-stone-400">All customer orders</p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Completed Orders</p>

          <p className="mt-3 text-3xl font-bold text-green-700">
            {completedOrders}
          </p>

          <p className="mt-2 text-xs text-stone-400">Orders marked completed</p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Pending Orders</p>

          <p className="mt-3 text-3xl font-bold text-amber-600">
            {pendingOrders}
          </p>

          <p className="mt-2 text-xs text-stone-400">Awaiting completion</p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-stone-500">
            Total Order Value
          </p>

          <p className="mt-3 text-2xl font-bold text-[#684477]">
            {formatAmount(totalOrderValue)}
          </p>

          <p className="mt-2 text-xs text-stone-400">
            Combined value of all orders
          </p>
        </div>
      </div>

      {/* Orders Table */}
      <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
        <div className="flex flex-col gap-2 border-b border-stone-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-stone-900">All Orders</h2>

            <p className="mt-1 text-sm text-stone-500">
              Overview of customer orders and their current status.
            </p>
          </div>

          {!isLoading && (
            <span className="text-sm font-medium text-stone-500">
              {orders.length} {orders.length === 1 ? "order" : "orders"}
            </span>
          )}
        </div>

        {isLoading ? (
          <div className="flex min-h-64 items-center justify-center">
            <p className="font-medium text-stone-500">Loading orders...</p>
          </div>
        ) : error ? (
          <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
            <p className="font-semibold text-red-600">{error}</p>

            <button
              type="button"
              onClick={getAllOrders}
              className="mt-4 rounded-lg bg-[#684477] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#543563]"
            >
              Try Again
            </button>
          </div>
        ) : orders.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-stone-100 text-2xl">
              <span>🛍️</span>
            </div>

            <h3 className="mt-4 text-lg font-bold text-stone-800">
              No orders yet
            </h3>

            <p className="mt-2 text-sm text-stone-500">
              Customer orders will appear here when someone places an order.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[950px] text-left">
                <thead className="bg-stone-50">
                  <tr className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                    <th className="px-5 py-4">Order ID</th>
                    <th className="px-5 py-4">Customer ID</th>
                    <th className="px-5 py-4">Book Details</th>
                    <th className="px-5 py-4">Order Amount</th>
                    <th className="px-5 py-4">Order Date</th>
                    <th className="px-5 py-4">Order Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-stone-100">
                  {orders.map((order) => {
                    const book = bookDetails[order._id];

                    const orderDate =
                      order.orderDate || order.createdAt || order.timestamp;

                    return (
                      <tr
                        key={order._id}
                        className="transition hover:bg-[#fcfafc]"
                      >
                        {/* Order ID */}
                        <td className="whitespace-nowrap px-5 py-5">
                          <span className="font-semibold text-[#684477]">
                            {getShortId(order._id)}
                          </span>
                        </td>

                        {/* Customer ID */}
                        <td className="whitespace-nowrap px-5 py-5">
                          <span className="text-sm font-medium text-stone-700">
                            {getCustomerId(order.user)}
                          </span>
                        </td>

                        {/* Book Details */}
                        <td className="px-5 py-5">
                          {book ? (
                            <div>
                              <p className="max-w-[220px] truncate font-semibold text-stone-800">
                                {book.title || "Untitled book"}
                              </p>

                              <p className="mt-1 text-xs text-stone-400">
                                Book ID: {getShortId(book._id)}
                              </p>
                            </div>
                          ) : (
                            <span className="text-sm text-stone-400">
                              {isLoadingBooks
                                ? "Loading book..."
                                : "Book details unavailable"}
                            </span>
                          )}
                        </td>

                        {/* Order Amount */}
                        <td className="whitespace-nowrap px-5 py-5">
                          <span className="font-semibold text-stone-800">
                            {formatAmount(order.totalAmount)}
                          </span>
                        </td>

                        {/* Order Date */}
                        <td className="whitespace-nowrap px-5 py-5 text-sm text-stone-600">
                          {formatDate(orderDate)}
                        </td>

                        {/* Order Status */}
                        <td className="whitespace-nowrap px-5 py-5">
                          <span
                            className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold capitalize ring-1 ring-inset ${getStatusStyle(
                              order.status
                            )}`}
                          >
                            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-current" />
                            {order.status || "Unknown"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="border-t border-stone-200 px-6 py-4">
              <p className="text-sm text-stone-500">
                Showing {orders.length}{" "}
                {orders.length === 1 ? "order" : "orders"}
              </p>
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default AdminOrders;
