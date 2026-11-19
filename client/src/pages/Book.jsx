
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const Book = () => {
  const { books = [], isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortBy, setSortBy] = useState("recommended");

  // Get available genres dynamically from database books
  const genres = useMemo(() => {
    return [
      "All",
      ...new Set(
        books
          .map((book) => book.genre?.trim())
          .filter(Boolean)
      ),
    ];
  }, [books]);

  // Search, filter and sort books
  const filteredBooks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    let result = books.filter((book) => {
      const matchesSearch = [
        book.title,
        book.author,
        book.genre,
      ].some((value) => value?.toLowerCase().includes(query));

      const matchesGenre =
        selectedGenre === "All" ||
        book.genre?.toLowerCase() === selectedGenre.toLowerCase();

      return matchesSearch && matchesGenre;
    });

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => Number(a.price) - Number(b.price));
        break;

      case "price-high":
        result.sort((a, b) => Number(b.price) - Number(a.price));
        break;

      case "title":
        result.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;

      default:
        break;
    }

    return result;
  }, [books, searchQuery, selectedGenre, sortBy]);

  const buyBook = (id) => {
    if (!isLoggedIn) {
      toast.info("Please log in to purchase a book.");
      navigate("/login");
      return;
    }

    navigate(`/order/${id}`);
  };

  return (
    <main className="min-h-screen bg-[#fffdf9]">

      {/* Page heading */}
      <section className="bg-gradient-to-br from-[#f8eafa] to-[#fff9fc]">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#684477]">
            Find your next read
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
            Explore Our Books
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg">
            Discover stories, ideas and perspectives across different
            genres. Find a book that speaks to you.
          </p>
        </div>
      </section>

      {/* Book collection */}
      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-10">

        {/* Search and result count */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold text-stone-900">
              Our Collection
            </h2>

            <p className="mt-1 text-sm text-stone-500">
              Showing {filteredBooks.length} of {books.length} books
            </p>
          </div>

          <div className="relative w-full sm:max-w-md">
            <svg
              className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16 16 4 4"
              />
            </svg>

            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, author or genre..."
              aria-label="Search books"
              className="w-full rounded-xl border border-stone-200 bg-white py-3.5 pl-12 pr-4 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-[#684477] focus:ring-2 focus:ring-[#684477]/10"
            />
          </div>
        </div>

        {/* Genre filters and sorting */}
        <div className="mb-10 flex flex-col gap-5 border-b border-stone-200 pb-7">

          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">

            {/* Genre filter */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-2 text-sm font-semibold text-stone-700">
                Genre:
              </span>

              {genres.map((genre) => (
                <button
                  key={genre}
                  type="button"
                  onClick={() => setSelectedGenre(genre)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    selectedGenre === genre
                      ? "bg-[#684477] text-white shadow-sm"
                      : "border border-stone-200 bg-white text-stone-600 hover:border-[#684477] hover:text-[#684477]"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>

            {/* Sorting */}
            <div className="flex items-center gap-3">
              <label
                htmlFor="sort-books"
                className="shrink-0 text-sm font-semibold text-stone-700"
              >
                Sort by:
              </label>

              <select
                id="sort-books"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-700 outline-none focus:border-[#684477] sm:w-auto"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="title">Title: A to Z</option>
              </select>
            </div>
          </div>

          {/* Clear filters */}
          {(searchQuery || selectedGenre !== "All" || sortBy !== "recommended") && (
            <div>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedGenre("All");
                  setSortBy("recommended");
                }}
                className="text-sm font-semibold text-[#684477] hover:underline"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        {/* Book grid */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredBooks.map((book) => (
              <article
                key={book._id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Cover image */}
                <div className="flex h-64 items-center justify-center overflow-hidden bg-stone-100 p-5">
                  {book.cover_image_url ? (
                    <img
                      src={book.cover_image_url}
                      alt={`Cover of ${book.title}`}
                      loading="lazy"
                      className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-stone-400">
                      No cover available
                    </div>
                  )}
                </div>

                {/* Book details */}
                <div className="flex flex-1 flex-col p-5">
                  {book.genre && (
                    <span className="mb-3 w-fit rounded-full bg-[#f5edf7] px-3 py-1 text-xs font-semibold text-[#684477]">
                      {book.genre}
                    </span>
                  )}

                  <h3 className="text-lg font-bold text-stone-900 transition group-hover:text-[#684477]">
                    {book.title}
                  </h3>

                  <p className="mt-2 text-sm text-stone-500">
                    By {book.author || "Unknown author"}
                  </p>

                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-stone-100 pt-5 mt-6">
                    <p className="text-xl font-bold text-stone-900">
                      ₹{Number(book.price).toLocaleString("en-IN")}
                    </p>

                    <button
                      type="button"
                      onClick={() => buyBook(book._id)}
                      className="rounded-lg bg-[#684477] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#543563] focus:outline-none focus:ring-2 focus:ring-[#684477] focus:ring-offset-2"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-16 text-center">
            <div className="text-4xl">📚</div>

            <h3 className="mt-4 text-xl font-bold text-stone-900">
              No books found
            </h3>

            <p className="mt-2 text-sm text-stone-500">
              Try changing your search or selected genre.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedGenre("All");
                setSortBy("recommended");
              }}
              className="mt-5 font-semibold text-[#684477] hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default Book;
