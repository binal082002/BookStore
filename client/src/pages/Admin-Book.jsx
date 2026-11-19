
import { useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import API_BASE_URL from "../utils/api";

const defaultBookForm = {
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

const AdminAddBook = () => {
  const { authToken } = useAuth();

  const [book, setBook] = useState(defaultBookForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;

    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));

    if (name === "cover_image_url") {
      setImageError(false);
    }
  };

  const handleReset = () => {
    setBook(defaultBookForm);
    setImageError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (Number(book.price) < 0 || Number(book.stock) < 0) {
      toast.error("Price and stock cannot be negative.");
      return;
    }

    if (
      !Number.isInteger(Number(book.publication_year)) ||
      Number(book.publication_year) <= 0
    ) {
      toast.error("Please enter a valid publication year.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(
        `${API_BASE_URL}/api/admin/add/book`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authToken,
          },
          body: JSON.stringify(book),
        }
      );

      const res_data = await response.json();

      if (!response.ok) {
        throw new Error(
          res_data.message || "Unable to add the book."
        );
      }

      toast.success("Book added successfully!");
      setBook(defaultBookForm);
      setImageError(false);
    } catch (err) {
      console.error("Add book error:", err);
      toast.error(err.message || "Book could not be added.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-[#684477] focus:ring-2 focus:ring-[#684477]/10";

  const labelClass =
    "text-sm font-semibold text-stone-700";

  return (
    <main className="mx-auto w-full max-w-7xl">

      {/* Page Heading */}
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#684477]">
          STORE MANAGEMENT
        </p>

        <h1 className="mt-2 text-3xl font-bold text-stone-900 sm:text-4xl">
          Add New Book
        </h1>

        <p className="mt-2 text-sm text-stone-500 sm:text-base">
          Add a new book to your bookstore catalog and manage its inventory.
        </p>
      </div>

      <form onSubmit={handleSubmit}>

        <div className="grid gap-6 lg:grid-cols-3">

          {/* Main Form */}
          <div className="space-y-6 lg:col-span-2">

            {/* Basic Information */}
            <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">

              <div className="mb-6 border-b border-stone-100 pb-5">
                <h2 className="text-lg font-bold text-stone-900">
                  Book Information
                </h2>

                <p className="mt-1 text-sm text-stone-500">
                  Enter the basic details of the book.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <label htmlFor="book_id" className={labelClass}>
                    Book ID <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="book_id"
                    id="book_id"
                    placeholder="e.g. BK001"
                    required
                    autoComplete="off"
                    value={book.book_id}
                    onChange={handleInput}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="isbn" className={labelClass}>
                    ISBN <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="isbn"
                    id="isbn"
                    placeholder="Enter ISBN number"
                    required
                    autoComplete="off"
                    value={book.isbn}
                    onChange={handleInput}
                    className={inputClass}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="title" className={labelClass}>
                    Book Title <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Enter the book title"
                    required
                    autoComplete="off"
                    value={book.title}
                    onChange={handleInput}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="author" className={labelClass}>
                    Author <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="author"
                    id="author"
                    placeholder="Enter author name"
                    required
                    autoComplete="off"
                    value={book.author}
                    onChange={handleInput}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="genre" className={labelClass}>
                    Genre <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="genre"
                    id="genre"
                    placeholder="e.g. Fiction, Mystery"
                    required
                    autoComplete="off"
                    value={book.genre}
                    onChange={handleInput}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="publication_year" className={labelClass}>
                    Publication Year <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="number"
                    name="publication_year"
                    id="publication_year"
                    placeholder="e.g. 2024"
                    min="1"
                    max={new Date().getFullYear()}
                    step="1"
                    required
                    value={book.publication_year}
                    onChange={handleInput}
                    className={inputClass}
                  />
                </div>

              </div>
            </section>

            {/* Pricing and Inventory */}
            <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">

              <div className="mb-6 border-b border-stone-100 pb-5">
                <h2 className="text-lg font-bold text-stone-900">
                  Pricing & Inventory
                </h2>

                <p className="mt-1 text-sm text-stone-500">
                  Set the selling price and available stock.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <label htmlFor="price" className={labelClass}>
                    Book Price (₹) <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-stone-500">
                      ₹
                    </span>

                    <input
                      type="number"
                      name="price"
                      id="price"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required
                      value={book.price}
                      onChange={handleInput}
                      className={`${inputClass} pl-9`}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="stock" className={labelClass}>
                    Available Stock <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="number"
                    name="stock"
                    id="stock"
                    placeholder="Enter quantity"
                    min="0"
                    step="1"
                    required
                    value={book.stock}
                    onChange={handleInput}
                    className={inputClass}
                  />
                </div>

              </div>
            </section>

            {/* Book Cover */}
            <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">

              <div className="mb-6 border-b border-stone-100 pb-5">
                <h2 className="text-lg font-bold text-stone-900">
                  Book Cover
                </h2>

                <p className="mt-1 text-sm text-stone-500">
                  Provide an image URL for the book cover.
                </p>
              </div>

              <label htmlFor="cover_image_url" className={labelClass}>
                Cover Image URL <span className="text-red-500">*</span>
              </label>

              <input
                type="url"
                name="cover_image_url"
                id="cover_image_url"
                placeholder="https://example.com/book-cover.jpg"
                required
                value={book.cover_image_url}
                onChange={handleInput}
                className={inputClass}
              />

              {book.cover_image_url && (
                <div className="mt-5 rounded-xl border border-stone-200 bg-stone-50 p-4">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-stone-500">
                    Cover Preview
                  </p>

                  <div className="flex min-h-48 items-center justify-center">
                    {!imageError ? (
                      <img
                        src={book.cover_image_url}
                        alt="Book cover preview"
                        onError={() => setImageError(true)}
                        className="max-h-64 max-w-full rounded-lg object-contain shadow-sm"
                      />
                    ) : (
                      <p className="text-sm text-red-500">
                        Unable to load image. Please check the URL.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Side Information */}
          <aside className="space-y-6">

            <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <h2 className="font-bold text-stone-900">
                Before Publishing
              </h2>

              <p className="mt-3 text-sm leading-6 text-stone-500">
                Please verify the book information before adding it to your catalog.
              </p>

              <ul className="mt-5 space-y-3 text-sm text-stone-600">
                <li className="flex gap-2">
                  <span className="font-bold text-[#684477]">✓</span>
                  Ensure the book ID is unique.
                </li>

                <li className="flex gap-2">
                  <span className="font-bold text-[#684477]">✓</span>
                  Double-check the ISBN.
                </li>

                <li className="flex gap-2">
                  <span className="font-bold text-[#684477]">✓</span>
                  Verify the cover image URL.
                </li>

                <li className="flex gap-2">
                  <span className="font-bold text-[#684477]">✓</span>
                  Confirm price and stock quantity.
                </li>
              </ul>
            </section>

            <section className="rounded-2xl border border-[#e7d9ed] bg-[#f8f3fa] p-6">
              <h3 className="font-bold text-[#684477]">
                Form Summary
              </h3>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-stone-500">Book title</span>
                  <span className="max-w-32 truncate font-semibold text-stone-800">
                    {book.title || "Not entered"}
                  </span>
                </div>

                <div className="flex justify-between gap-3">
                  <span className="text-stone-500">Author</span>
                  <span className="max-w-32 truncate font-semibold text-stone-800">
                    {book.author || "Not entered"}
                  </span>
                </div>

                <div className="flex justify-between gap-3">
                  <span className="text-stone-500">Price</span>
                  <span className="font-semibold text-stone-800">
                    {book.price ? `₹${book.price}` : "Not entered"}
                  </span>
                </div>

                <div className="flex justify-between gap-3">
                  <span className="text-stone-500">Stock</span>
                  <span className="font-semibold text-stone-800">
                    {book.stock || book.stock === "0"
                      ? book.stock
                      : "Not entered"}
                  </span>
                </div>
              </div>
            </section>

            <div className="space-y-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-[#684477] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#543563] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Adding Book..." : "Add Book to Catalog"}
              </button>

              <button
                type="button"
                onClick={handleReset}
                disabled={isSubmitting}
                className="w-full rounded-xl border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-600 transition hover:bg-stone-100 disabled:opacity-50"
              >
                Reset Form
              </button>
            </div>

          </aside>
        </div>
      </form>
    </main>
  );
};

export default AdminAddBook;
