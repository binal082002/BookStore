import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";

const Navbar = () => {
  const { isLoggedIn, isAdmin, user } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/service" },
    ...(isAdmin ? [{ name: "Admin", path: "/admin" }] : []),
    { name: "Contact", path: "/contact" },
  ];

  const linkClass = ({ isActive }) =>
    `text-base font-semibold transition-colors duration-200 ${
      isActive ? "text-[#684477]" : "text-stone-600 hover:text-[#684477]"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-[#fffdf9]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={() => setMenuVisible(false)}
        >
          <img
            src="/images/logo.png"
            alt="BookShelf logo"
            className="h-12 w-12 object-contain"
          />

          <span className="text-3xl font-bold tracking-tight text-stone-900">
            Book<span className="text-[#684477]">Shelf</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={linkClass}>
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-4 md:flex">
          {isLoggedIn ? (
            <>
              <span className="text-sm font-semibold text-stone-700">
                Hi, {user?.username || "User"}
              </span>
              <Link
                to={`/Myorder/${user?._id}/detail`}
                className="rounded-lg px-5 py-3 text-base font-semibold text-stone-700 transition hover:bg-stone-100"
              >
                My Orders
              </Link>

              <Link
                to="/logout"
                className="rounded-lg bg-[#684477] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#543563]"
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg px-5 py-3 text-base font-semibold text-stone-700 transition hover:bg-stone-100"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-[#684477] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#543563]"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuVisible((visible) => !visible)}
          aria-label={menuVisible ? "Close menu" : "Open menu"}
          aria-expanded={menuVisible}
          className="rounded-lg p-2 text-stone-700 transition hover:bg-stone-100 md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {menuVisible ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile navigation */}
      {menuVisible && (
        <div className="border-t border-stone-200 bg-[#fffdf9] px-5 py-5 md:hidden">
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={linkClass}
                onClick={() => setMenuVisible(false)}
              >
                {link.name}
              </NavLink>
            ))}

            <div className="flex flex-col gap-4 border-t border-stone-200 pt-5">
              {isLoggedIn ? (
                <>
                  <span className="text-sm font-semibold text-stone-700">
                    Hi, {user?.username || "User"}
                  </span>
                  <Link
                    to={`/Myorder/${user?._id}/detail`}
                    onClick={() => setMenuVisible(false)}
                    className="text-base font-semibold text-stone-700"
                  >
                    My Orders
                  </Link>

                  <Link
                    to="/logout"
                    onClick={() => setMenuVisible(false)}
                    className="text-base font-semibold text-[#684477]"
                  >
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMenuVisible(false)}
                    className="text-base font-semibold text-stone-700"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={() => setMenuVisible(false)}
                    className="text-base font-semibold text-[#684477]"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
