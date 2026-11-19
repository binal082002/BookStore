
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import API_BASE_URL from "../utils/api";

const AdminBooks = () => {
    const { authToken } = useAuth();

    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const getAllBooks = async () => {
        try {
            setIsLoading(true);
            setError("");

            const response = await fetch(`${API_BASE_URL}/api/admin/books`, {
                method: "GET",
                headers: {
                    Authorization: authToken,
                },
            });

            const res_data = await response.json();

            if (!response.ok) {
                throw new Error(res_data.message || "Unable to fetch books.");
            }

            setBooks(res_data.message || []);
        } catch (err) {
            console.error(err);
            setError(err.message || "Something went wrong.");
            toast.error(err.message || "Unable to fetch books.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (authToken) {
            getAllBooks();
        }
    }, [authToken]);

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#684477]">
                        Store Management
                    </p>

                    <h1 className="mt-2 text-2xl font-bold text-stone-800 sm:text-3xl">
                        Manage Books
                    </h1>

                    <p className="mt-2 text-sm text-stone-500">
                        View and manage your bookstore inventory.
                    </p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={getAllBooks}
                        disabled={isLoading}
                        className="rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-600 transition hover:bg-stone-50 disabled:opacity-60"
                    >
                        Refresh
                    </button>

                    <Link
                        to="/admin/add/book"
                        className="rounded-xl bg-[#684477] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#563763]"
                    >
                        + Add Book
                    </Link>
                </div>
            </div>

            {/* Summary */}
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                <p className="text-sm text-stone-500">Total Books</p>

                <p className="mt-2 text-3xl font-bold text-stone-800">
                    {books.length}
                </p>
            </div>

            {/* Loading */}
            {isLoading && (
                <div className="flex min-h-[250px] items-center justify-center rounded-2xl border border-stone-200 bg-white">
                    <div className="text-center">
                        <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-purple-100 border-t-[#684477]"></div>
                        <p className="mt-3 text-sm text-stone-500">
                            Loading books...
                        </p>
                    </div>
                </div>
            )}

            {/* Error */}
            {!isLoading && error && (
                <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center">
                    <p className="font-semibold text-red-800">
                        Unable to load books
                    </p>
                    <p className="mt-2 text-sm text-red-600">{error}</p>

                    <button
                        onClick={getAllBooks}
                        className="mt-4 rounded-lg bg-[#684477] px-5 py-2.5 text-sm font-medium text-white"
                    >
                        Try Again
                    </button>
                </div>
            )}

            {/* Books Table */}
            {!isLoading && !error && (
                <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">

                    <div className="border-b border-stone-100 px-6 py-5">
                        <h2 className="font-semibold text-stone-800">
                            All Books
                        </h2>
                        <p className="mt-1 text-sm text-stone-500">
                            Manage book information and inventory.
                        </p>
                    </div>

                    {books.length === 0 ? (
                        <div className="px-6 py-16 text-center">
                            <h3 className="font-semibold text-stone-800">
                                No books found
                            </h3>
                            <p className="mt-2 text-sm text-stone-500">
                                Add your first book to get started.
                            </p>

                            <Link
                                to="/admin/add/book"
                                className="mt-5 inline-block rounded-xl bg-[#684477] px-5 py-2.5 text-sm font-semibold text-white"
                            >
                                Add Book
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[850px] text-left">
                                <thead className="bg-[#fffdf9]">
                                    <tr className="text-xs uppercase tracking-wider text-stone-500">
                                        <th className="px-6 py-4">Book</th>
                                        <th className="px-6 py-4">Author</th>
                                        <th className="px-6 py-4">Genre</th>
                                        <th className="px-6 py-4">Price</th>
                                        <th className="px-6 py-4">Stock</th>
                                        <th className="px-6 py-4 text-right">Action</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-stone-100">
                                    {books.map((book) => (
                                        <tr
                                            key={book._id}
                                            className="transition hover:bg-[#fffdf9]"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    {book.cover_image_url ? (
                                                        <img
                                                            src={book.cover_image_url}
                                                            alt={book.title}
                                                            className="h-14 w-11 rounded-lg border border-stone-200 object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-14 w-11 items-center justify-center rounded-lg bg-purple-50 text-xs text-purple-400">
                                                            N/A
                                                        </div>
                                                    )}

                                                    <div>
                                                        <p className="font-semibold text-stone-800">
                                                            {book.title}
                                                        </p>
                                                        <p className="mt-1 text-xs text-stone-400">
                                                            {book.book_id}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-sm text-stone-600">
                                                {book.author}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-stone-600">
                                                {book.genre}
                                            </td>

                                            <td className="px-6 py-4 text-sm font-semibold text-stone-800">
                                                ₹{book.price}
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                    Number(book.stock) > 0
                                                        ? "bg-green-50 text-green-700"
                                                        : "bg-red-50 text-red-600"
                                                }`}>
                                                    {book.stock} in stock
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-right">
                                                <Link
                                                    to={`/admin/books/${book._id}/edit`}
                                                    className="inline-block rounded-lg border border-[#684477]/20 px-4 py-2 text-sm font-semibold text-[#684477] transition hover:bg-purple-50"
                                                >
                                                    Edit
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminBooks;
