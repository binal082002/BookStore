
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import API_BASE_URL from "../utils/api";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleInput = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.email.trim() || !user.password) {
      toast.error("Please enter your email and password.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email.trim(),
          password: user.password,
        }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(
          resData.extraDetails || resData.message || "Login failed."
        );
      }

      if (!resData.token) {
        throw new Error("Login response did not contain an authentication token.");
      }

      storeTokenInLS(resData.token);

      toast.success("Login successful!");
      setUser({ email: "", password: "" });
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
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
            src="/images/login.png"
            alt="Login to your BookShelf account"
            className="w-full max-w-md object-contain"
          />
        </div>

        {/* Login Form */}
        <div className="mx-auto w-full max-w-md rounded-2xl border border-stone-200 bg-white p-7 shadow-sm sm:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#684477]">
              Welcome Back
            </p>

            <h1 className="mt-3 text-3xl font-bold text-stone-900">
              Login to BookShelf
            </h1>

            <p className="mt-3 text-sm leading-6 text-stone-500">
              Sign in to explore books and manage your orders.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
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
                  placeholder="Enter your password"
                  autoComplete="current-password"
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
              {isSubmitting ? "Signing in..." : "Login"}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-stone-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-[#684477] hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;
