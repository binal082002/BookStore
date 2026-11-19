
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import API_BASE_URL from "../utils/api";

const initialForm = {
    book_id: "",
    title: "",
    author: "",
    isbn: "",
    genre: "",
    publication_year: "",
    cover_image_url: "",
    price: "",
    stock: "",
};

const AdminEditBook = () => {
    const { id } = useParams();
    const { authToken } = useAuth();

    const [book, setBook] = useState(initialForm);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");
    const [imageError, setImageError] = useState(false);

    // Fetch existing book details
    const getBookDetails = async () => {
        try {
            setIsLoading(true);
            setError("");

            const response = await fetch(
                `${API_BASE_URL}/api/admin/books/${id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: authToken,
                    },
                }
            );

            const res_data = await response.json();

            if (!response.ok) {
                throw new Error(res_data.message || "Unable to fetch book details.");
            }

            const bookData = res_data.data;

            setBook({
                book_id: bookData.book_id || "",
                title: bookData.title || "",
                author: bookData.author || "",
                isbn: bookData.isbn || "",
                genre: bookData.genre || "",
                publication_year: bookData.publication_year || "",
                cover_image_url: bookData.cover_image_url || "",
                price: bookData.price ?? "",
                stock: bookData.stock ?? "",
            });

        } catch (err) {
            console.error(err);
            setError(err.message || "Something went wrong.");
            toast.error(err.message || "Unable to fetch book.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (authToken && id) {
            getBookDetails();
        }
    }, [authToken, id]);

    // Handle input changes
    const handleInput = (e) => {
        const { name, value } = e.target;

        setBook((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Update book
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !book.book_id.trim() ||
            !book.title.trim() ||
            !book.author.trim() ||
            !book.isbn.trim() ||
            !book.genre.trim()
        ) {
            toast.error("Please fill in all required fields.");
            return;
        }

        try {
            setIsSaving(true);

            const response = await fetch(
                `${API_BASE_URL}/api/admin/books/update/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: authToken,
                    },
                    body: JSON.stringify({
                        ...book,
                        publication_year: Number(book.publication_year),
                        price: Number(book.price),
                        stock: Number(book.stock),
                    }),
                }
            );

            const res_data = await response.json();

            if (!response.ok) {
                throw new Error(res_data.message || "Unable to update book.");
            }

            toast.success("Book updated successfully!");

        } catch (err) {
            console.error(err);
            toast.error(err.message || "Something went wrong.");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-purple-100 border-t-[#684477]"></div>
                    <p className="mt-4 text-sm text-stone-500">
                        Loading book details...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-2xl border border-red-100 bg-red-50 p-8 text-center">
                <h2 className="text-lg font-semibold text-red-800">
                    Unable to load book
                </h2>

                <p className="mt-2 text-sm text-red-600">{error}</p>

                <button
                    onClick={getBookDetails}
                    className="mt-5 rounded-lg bg-[#684477] px-5 py-2.5 text-sm font-medium text-white"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-5xl space-y-6">

            {/* Header */}
            <div>
                <Link
                    to="/admin/books"
                    className="text-sm font-medium text-stone-500 transition hover:text-[#684477]"
                >
                    ← Back to Manage Books
                </Link>

                <div className="mt-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#684477]">
                        Store Management
                    </p>

                    <h1 className="mt-2 text-2xl font-bold text-stone-800 sm:text-3xl">
                        Edit Book
                    </h1>

                    <p className="mt-2 text-sm text-stone-500">
                        Update book information and inventory details.
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Book Information */}
                <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
                    <h2 className="text-lg font-semibold text-stone-800">
                        Book Information
                    </h2>

                    <p className="mt-1 text-sm text-stone-500">
                        Basic details about the book.
                    </p>

                    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">

                        {[
                            ["book_id", "Book ID"],
                            ["title", "Book Title"],
                            ["author", "Author"],
                            ["isbn", "ISBN"],
                            ["genre", "Genre"],
                            ["publication_year", "Publication Year"],
                        ].map(([name, label]) => (
                            <div key={name}>
                                <label
                                    htmlFor={name}
                                    className="mb-2 block text-sm font-medium text-stone-700"
                                >
                                    {label}
                                </label>

                                <input
                                    id={name}
                                    name={name}
                                    type={name === "publication_year" ? "number" : "text"}
                                    required
                                    value={book[name]}
                                    onChange={handleInput}
                                    className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-[#684477] focus:ring-2 focus:ring-[#684477]/10"
                                />
                            </div>
                        ))}

                    </div>
                </div>

                {/* Pricing and Inventory */}
                <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
                    <h2 className="text-lg font-semibold text-stone-800">
                        Pricing & Inventory
                    </h2>

                    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">

                        <div>
                            <label htmlFor="price" className="mb-2 block text-sm font-medium text-stone-700">
                                Price (₹)
                            </label>

                            <input
                                id="price"
                                name="price"
                                type="number"
                                min="0"
                                step="0.01"
                                required
                                value={book.price}
                                onChange={handleInput}
                                className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-[#684477] focus:ring-2 focus:ring-[#684477]/10"
                            />
                        </div>

                        <div>
                            <label htmlFor="stock" className="mb-2 block text-sm font-medium text-stone-700">
                                Available Stock
                            </label>

                            <input
                                id="stock"
                                name="stock"
                                type="number"
                                min="0"
                                step="1"
                                required
                                value={book.stock}
                                onChange={handleInput}
                                className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-[#684477] focus:ring-2 focus:ring-[#684477]/10"
                            />
                        </div>

                    </div>
                </div>

                {/* Cover Image */}
                <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
                    <h2 className="text-lg font-semibold text-stone-800">
                        Book Cover
                    </h2>

                    <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-[1fr_160px]">

                        <div>
                            <label
                                htmlFor="cover_image_url"
                                className="mb-2 block text-sm font-medium text-stone-700"
                            >
                                Cover Image URL
                            </label>

                            <input
                                id="cover_image_url"
                                name="cover_image_url"
                                type="url"
                                value={book.cover_image_url}
                                onChange={(e) => {
                                    handleInput(e);
                                    setImageError(false);
                                }}
                                placeholder="https://example.com/book-cover.jpg"
                                className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-[#684477] focus:ring-2 focus:ring-[#684477]/10"
                            />

                            <p className="mt-2 text-xs text-stone-400">
                                Update the URL to change the book cover.
                            </p>
                        </div>

                        <div className="flex justify-center">
                            {book.cover_image_url && !imageError ? (
                                <img
                                    src={book.cover_image_url}
                                    alt="Book cover preview"
                                    onError={() => setImageError(true)}
                                    className="h-44 w-32 rounded-lg border border-stone-200 object-cover shadow-sm"
                                />
                            ) : (
                                <div className="flex h-44 w-32 items-center justify-center rounded-lg border border-dashed border-stone-300 bg-stone-50 text-xs text-stone-400">
                                    No Preview
                                </div>
                            )}
                        </div>

                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                    <Link
                        to="/admin/books"
                        className="rounded-xl border border-stone-200 bg-white px-6 py-3 text-center text-sm font-medium text-stone-600 transition hover:bg-stone-50"
                    >
                        Cancel
                    </Link>

                    <button
                        type="submit"
                        disabled={isSaving}
                        className="rounded-xl bg-[#684477] px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#563763] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSaving ? "Saving Changes..." : "Save Changes"}
                    </button>

                </div>

            </form>
        </div>
    );
};

export default AdminEditBook;
