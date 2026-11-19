
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API_BASE_URL from "../utils/api";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !user.username.trim() ||
      !user.email.trim() ||
      !user.phone.trim() ||
      !user.password
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...user,
          username: user.username.trim(),
          email: user.email.trim(),
          phone: user.phone.trim(),
        }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(
          resData.extraDetails || resData.message || "Registration failed."
        );
      }

      toast.success("Registration successful! Please login.");

      setUser({
        username: "",
        email: "",
        phone: "",
        password: "",
      });

      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fffdf9]">
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 sm:px-10 lg:grid-cols-2 lg:gap-20">

        {/* Illustration */}
        <div className="flex justify-center">
          <img
            src="/images/register.png"
            alt="Create your BookShelf account"
            className="w-full max-w-md object-contain"
          />
        </div>

        {/* Registration Form */}
        <div className="mx-auto w-full max-w-md rounded-2xl border border-stone-200 bg-white p-7 shadow-sm sm:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#684477]">
              Join Our Community
            </p>

            <h1 className="mt-3 text-3xl font-bold text-stone-900">
              Create an Account
            </h1>

            <p className="mt-3 text-sm leading-6 text-stone-500">
              Sign up to explore books and enjoy a simple shopping experience.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-semibold text-stone-700"
              >
                Username
              </label>

              <input
                type="text"
                id="username"
                name="username"
                value={user.username}
                onChange={handleInput}
                placeholder="Enter your username"
                autoComplete="username"
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
                value={user.email}
                onChange={handleInput}
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="w-full rounded-xl border border-stone-200 px-4 py-3 text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-[#684477] focus:ring-2 focus:ring-[#684477]/10"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-semibold text-stone-700"
              >
                Phone number
              </label>

              <input
                type="tel"
                id="phone"
                name="phone"
                value={user.phone}
                onChange={handleInput}
                placeholder="Enter your phone number"
                autoComplete="tel"
                required
                className="w-full rounded-xl border border-stone-200 px-4 py-3 text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-[#684477] focus:ring-2 focus:ring-[#684477]/10"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-stone-700"
              >
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={handleInput}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  required
                  className="w-full rounded-xl border border-stone-200 px-4 py-3 pr-20 text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-[#684477] focus:ring-2 focus:ring-[#684477]/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#684477] hover:text-[#543563]"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-[#684477] px-6 py-3.5 font-semibold text-white transition hover:bg-[#543563] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-stone-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#684477] hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Register;
