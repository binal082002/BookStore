
import { NavLink } from "react-router-dom";
import { Home, ArrowLeft, BookOpen } from "lucide-react";

const Error = () => {
  return (
    <section className="min-h-[75vh] flex items-center justify-center bg-[#fffdf9] px-5 py-16">
      <div className="w-full max-w-2xl text-center">

        {/* Illustration */}
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#f1eaf4]">
          <BookOpen size={42} className="text-[#684477]" />
        </div>

        {/* Error Code */}
        <h1 className="text-8xl sm:text-9xl font-extrabold tracking-tight text-[#684477]">
          404
        </h1>

        <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-stone-800">
          Oops! Page not found
        </h2>

        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-stone-500">
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back to discovering your next favourite book.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <NavLink
            to="/"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-[#684477] px-7 py-3 font-semibold text-white transition hover:bg-[#553665] hover:shadow-lg"
          >
            <Home size={18} />
            Return Home
          </NavLink>

          <NavLink
            to="/contact"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-[#684477] px-7 py-3 font-semibold text-[#684477] transition hover:bg-[#f1eaf4]"
          >
            <ArrowLeft size={18} />
            Report a Problem
          </NavLink>
        </div>

        <p className="mt-12 text-sm text-stone-400">
          Error Code: 404 | BookStore
        </p>
      </div>
    </section>
  );
};

export default Error;
