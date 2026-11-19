
import { Link } from "react-router-dom";

const About = () => {
  const features = [
    {
      number: "01",
      title: "Explore Different Genres",
      description:
        "Discover books across fiction, fantasy, finance, self-help, classics, and more. Find something that matches your interests.",
    },
    {
      number: "02",
      title: "Find Your Next Read",
      description:
        "Search the collection by book title, author, or genre and explore the details before making your choice.",
    },
    {
      number: "03",
      title: "A Simple Shopping Experience",
      description:
        "Browse available books, check their prices, and place your order through a straightforward checkout experience.",
    },
  ];

  return (
    <main className="bg-[#fffdf9]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#f8eafa] via-[#fff9fc] to-[#f5f0fa]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 sm:px-10 lg:grid-cols-2 lg:py-24">

          <div>
            <p className="mb-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold tracking-wide text-[#684477] shadow-sm">
              GET TO KNOW US
            </p>

            <h1 className="text-5xl font-bold leading-tight tracking-tight text-stone-900 sm:text-6xl">
              More than just
              <span className="block text-[#684477]">
                a bookshelf.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-stone-600">
              We believe every book opens the door to a new idea,
              perspective, or adventure. BookShelf makes it easier
              to discover stories and find your next great read.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/book"
                className="rounded-xl bg-[#684477] px-7 py-4 font-semibold text-white shadow-lg shadow-[#684477]/20 transition hover:-translate-y-1 hover:bg-[#543563]"
              >
                Explore Collection →
              </Link>

              <Link
                to="/contact"
                className="rounded-xl border border-stone-300 bg-white px-7 py-4 font-semibold text-stone-700 transition hover:border-[#684477] hover:text-[#684477]"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="mx-auto w-full max-w-lg">
            <img
              src="/images/about.png"
              alt="Illustration representing reading and books"
              loading="lazy"
              className="w-full rounded-3xl object-contain"
            />
          </div>

        </div>
      </section>

      {/* What We Offer */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10">

        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#684477]">
            WHY BOOKSHELF
          </p>

          <h2 className="mt-3 text-3xl font-bold text-stone-900 sm:text-4xl">
            A better way to discover books.
          </h2>

          <p className="mt-4 text-lg leading-8 text-stone-600">
            Everything you need to explore our collection and
            choose your next read, without unnecessary complexity.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">

          {features.map((feature) => (
            <article
              key={feature.number}
              className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="text-sm font-bold tracking-widest text-[#9069a0]">
                {feature.number}
              </span>

              <h3 className="mt-6 text-xl font-bold text-stone-900">
                {feature.title}
              </h3>

              <p className="mt-4 leading-7 text-stone-600">
                {feature.description}
              </p>
            </article>
          ))}

        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-10">
        <div className="rounded-3xl bg-[#684477] px-8 py-12 text-center text-white sm:px-12 sm:py-16">

          <h2 className="text-3xl font-bold sm:text-4xl">
            Every great journey starts with a book.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
            Take a look at our collection and discover the book
            you've been looking for.
          </p>

          <Link
            to="/book"
            className="mt-8 inline-flex rounded-xl bg-white px-8 py-4 font-semibold text-[#684477] transition hover:-translate-y-1 hover:bg-stone-100"
          >
            Find Your Next Read →
          </Link>

        </div>
      </section>

    </main>
  );
};

export default About;
