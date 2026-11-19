
const Service = () => {
    const services = [
      {
        number: "01",
        title: "Explore a Wide Collection",
        description:
          "Discover books across different genres, from fiction and mystery to technology and self-development.",
      },
      {
        number: "02",
        title: "Simple Online Ordering",
        description:
          "Find the book you want and place your order through a straightforward shopping experience.",
      },
      {
        number: "03",
        title: "Convenient Order Tracking",
        description:
          "Keep track of your purchases and view your order details from your account.",
      },
    ];

    return (
      <main className="min-h-screen bg-[#fffdf9]">
        <section className="bg-gradient-to-br from-[#f8eafa] via-[#fff9fc] to-[#f5f0fa]">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#684477]">
              WHAT WE OFFER
            </p>

            <h1 className="mt-3 text-4xl font-bold text-stone-900 sm:text-5xl">
              Our Services
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-600">
              Everything you need to discover, purchase, and manage your
              favourite books in one place.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10">
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.number}
                className="rounded-2xl border border-stone-200 bg-white p-8 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="text-sm font-bold tracking-widest text-[#684477]">
                  {service.number}
                </span>

                <h2 className="mt-5 text-xl font-bold text-stone-900">
                  {service.title}
                </h2>

                <p className="mt-3 leading-7 text-stone-600">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
    );
  };

  export default Service;
