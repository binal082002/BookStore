
import { Link } from "react-router-dom";
import { useAuth } from "../store/auth";

const Home = () => {
  const { user, books = [] } = useAuth();

  const featuredBooks = books.slice(0, 4);

  return (
    <main className="bg-[#fffdf9]">

      {/* Hero Section */}
      <section className="overflow-hidden bg-gradient-to-br from-[#f8eafa] via-[#fff9fc] to-[#f5f0fa]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:py-28">

          <div className="max-w-2xl">
            <p className="mb-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold tracking-wide text-[#684477] shadow-sm">
              YOUR NEXT CHAPTER STARTS HERE
            </p>

            {user?.username && (
              <p className="mb-3 text-lg font-medium text-stone-600">
                Welcome back, {user.username}!
              </p>
            )}

            <h1 className="text-5xl font-bold leading-tight tracking-tight text-stone-900 sm:text-6xl lg:text-7xl">
              Discover a world
              <span className="block text-[#684477]">
                between pages.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-stone-600 sm:text-xl">
              From unforgettable stories to fresh perspectives,
              find books that inspire your imagination and stay
              with you long after the last page.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/book"
                className="rounded-xl bg-[#684477] px-8 py-4 font-semibold text-white shadow-lg shadow-[#684477]/20 transition hover:-translate-y-1 hover:bg-[#543563]"
              >
                Explore Books →
              </Link>

              <Link
                to="/about"
                className="rounded-xl border border-stone-300 bg-white px-8 py-4 font-semibold text-stone-700 transition hover:border-[#684477] hover:text-[#684477]"
              >
                About Us
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-5 rounded-[2rem] bg-[#d9c0e2]/40 blur-2xl" />

            <img
              src="/images/home.jpg"
              alt="Bookshelf illustration"
              className="relative aspect-square w-full rounded-3xl object-cover shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Featured Books */}
      {featuredBooks.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10">

          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[#684477]">
                Handpicked for you
              </p>

              <h2 className="mt-2 text-3xl font-bold text-stone-900 sm:text-4xl">
                Featured Books
              </h2>

              <p className="mt-3 text-stone-600">
                A few great reads to get you started.
              </p>
            </div>

            <Link
              to="/book"
              className="font-semibold text-[#684477] transition hover:underline"
            >
              View all books →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {featuredBooks.map((book) => (
              <article
                key={book._id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-64 items-center justify-center overflow-hidden bg-stone-100 p-5">
                  {book.cover_image_url ? (
                    <img
                      src={book.cover_image_url}
                      alt={`Cover of ${book.title}`}
                      loading="lazy"
                      className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <span className="text-sm text-stone-400">
                      No cover available
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5">
                  {book.genre && (
                    <span className="mb-3 w-fit rounded-full bg-[#f5edf7] px-3 py-1 text-xs font-semibold text-[#684477]">
                      {book.genre}
                    </span>
                  )}

                  <h3 className="text-lg font-bold text-stone-900">
                    {book.title}
                  </h3>

                  <p className="mt-2 text-sm text-stone-500">
                    By {book.author || "Unknown author"}
                  </p>

                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-stone-100 pt-5 mt-6">
                    <span className="text-xl font-bold text-stone-900">
                      ₹{Number(book.price).toLocaleString("en-IN")}
                    </span>

                    <Link
                      to={`/order/${book._id}`}
                      className="rounded-lg bg-[#684477] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#543563]"
                    >
                      View Book
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Closing CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-10">
        <div className="flex flex-col items-center justify-between gap-8 rounded-3xl bg-[#684477] px-8 py-12 text-center text-white sm:px-12 lg:flex-row lg:text-left">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Your next favorite book is waiting.
            </h2>

            <p className="mt-3 text-base leading-7 text-white/80 sm:text-lg">
              Explore our collection and find your next great read.
            </p>
          </div>

          <Link
            to="/book"
            className="shrink-0 rounded-xl bg-white px-8 py-4 font-semibold text-[#684477] transition hover:-translate-y-1 hover:bg-stone-100"
          >
            Browse Collection →
          </Link>
        </div>
      </section>

    </main>
  );
};

export default Home;
