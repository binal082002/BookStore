
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";
import API_BASE_URL from "../utils/api";

const defaultContactForm = {
  username: "",
  email: "",
  message: "",
};

const Contact = () => {
  const { user } = useAuth();
  const [contact, setContact] = useState(defaultContactForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prefill user details when logged in
  useEffect(() => {
    if (user) {
      setContact((prev) => ({
        ...prev,
        username: user.username || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleInput = (e) => {
    const { name, value } = e.target;

    setContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!contact.username.trim() || !contact.email.trim() || !contact.message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(`${API_BASE_URL}/api/form/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });

      if (!response.ok) {
        throw new Error("Unable to submit your message.");
      }

      setContact({
        ...defaultContactForm,
        username: user?.username || "",
        email: user?.email || "",
      });

      toast.success("Your message has been sent successfully!");
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fffdf9]">

      {/* Page heading */}
      <section className="bg-gradient-to-br from-[#f8eafa] via-[#fff9fc] to-[#f5f0fa]">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#684477]">
            WE'RE HERE TO HELP
          </p>

          <h1 className="mt-3 text-4xl font-bold text-stone-900 sm:text-5xl">
            Get in Touch
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-600">
            Have a question about a book, an order, or our collection?
            Send us a message and we'll be happy to hear from you.
          </p>
        </div>
      </section>

      {/* Contact form */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 sm:px-10 lg:grid-cols-2 lg:gap-20">

        {/* Illustration */}
        <div className="flex justify-center">
          <img
            src="/images/contact.png"
            alt="Contact BookShelf"
            loading="lazy"
            className="w-full max-w-md object-contain"
          />
        </div>

        {/* Form */}
        <div className="w-full rounded-2xl border border-stone-200 bg-white p-7 shadow-sm sm:p-10">

          <h2 className="text-2xl font-bold text-stone-900">
            Send us a message
          </h2>

          <p className="mt-2 text-sm leading-6 text-stone-500">
            Fill out the form below and let us know how we can help.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">

            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-semibold text-stone-700"
              >
                Your name
              </label>

              <input
                type="text"
                id="username"
                name="username"
                value={contact.username}
                onChange={handleInput}
                placeholder="Enter your name"
                autoComplete="name"
                required
                className="w-full rounded-xl border border-stone-200 px-4 py-3 text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-[#684477] focus:ring-2 focus:ring-[#684477]/10"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-stone-700"
              >
                Email address
              </label>

              <input
                type="email"
                id="email"
                name="email"
                value={contact.email}
                onChange={handleInput}
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="w-full rounded-xl border border-stone-200 px-4 py-3 text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-[#684477] focus:ring-2 focus:ring-[#684477]/10"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-semibold text-stone-700"
              >
                Your message
              </label>

              <textarea
                id="message"
                name="message"
                value={contact.message}
                onChange={handleInput}
                placeholder="Tell us how we can help..."
                rows={5}
                required
                className="w-full resize-y rounded-xl border border-stone-200 px-4 py-3 text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-[#684477] focus:ring-2 focus:ring-[#684477]/10"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-[#684477] px-6 py-3.5 font-semibold text-white transition hover:bg-[#543563] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : "Send Message →"}
            </button>

          </form>
        </div>
      </section>
    </main>
  );
};

export default Contact;
