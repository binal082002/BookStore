
import { useEffect } from "react";
import {
  NavLink,
  Navigate,
  Outlet,
  useLocation,
  Link,
} from "react-router-dom";

import {
  FaUser,
  FaRegListAlt,
  FaHome,
  FaBook,
  FaTachometerAlt,
} from "react-icons/fa";

import { FaMessage } from "react-icons/fa6";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
import { BookOpen } from "lucide-react";

const AdminLayout = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  const isAdmin = user?.isAdmin;
  const isDashboard = location.pathname === "/admin";

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      toast.error("Access denied!", {
        toastId: "admin-access-denied",
      });
    }
  }, [isLoading, isAdmin]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fffdf9]">
        <p className="text-stone-500">Loading admin panel...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  const navItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <FaTachometerAlt />,
      end: true,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <FaUser />,
    },
    {
      name: "Contacts",
      path: "/admin/contacts",
      icon: <FaMessage />,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: <FaRegListAlt />,
    },
    {
      name: "Add Book",
      path: "/admin/add/book",
      icon: <FaBook />,
    },
    {
        name: "Manage Books",
        path: "/admin/books",
        icon: <BookOpen size={18} />
    }
  ];

  return (
    <div className="min-h-screen bg-[#fffdf9]">

      {/* Top Header */}
      <header className="sticky top-0 z-30 border-b border-stone-200 bg-white">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

          <div>
            <Link to="/" className="text-xl font-bold text-[#684477]">
              BookShelf
            </Link>
            <p className="hidden text-xs text-stone-500 sm:block">
              Administration workspace
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm font-medium text-stone-600 sm:block">
              {user?.username || "Administrator"}
            </span>

            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-lg border border-stone-200 px-3 py-2 text-sm font-semibold text-stone-600 transition hover:bg-[#f1eaf4] hover:text-[#684477]"
            >
              <FaHome />
              <span className="hidden sm:inline">Back to Store</span>
              <span className="sm:hidden">Store</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Admin Workspace */}
      <div className="mx-auto flex max-w-[1600px]">

        {/* Desktop Sidebar */}
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 border-r border-stone-200 bg-white p-5 lg:block">

          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-stone-400">
            Workspace
          </p>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-[#f1eaf4] text-[#684477]"
                      : "text-stone-600 hover:bg-stone-50 hover:text-[#684477]"
                  }`
                }
              >
                <span className="text-base">{item.icon}</span>
                {item.name}
              </NavLink>
            ))}
          </nav>

          <div className="absolute bottom-5 left-5 right-5 rounded-xl bg-[#f8f3fa] p-4">
            <p className="text-sm font-semibold text-[#684477]">
              Admin Workspace
            </p>
            <p className="mt-1 text-xs leading-5 text-stone-600">
              Manage your bookstore, users and orders from here.
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="min-w-0 flex-1">

          {/* Mobile Navigation */}
          <div className="border-b border-stone-200 bg-white px-3 py-3 lg:hidden">
            <nav className="flex gap-2 overflow-x-auto">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    `inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                      isActive
                        ? "bg-[#684477] text-white"
                        : "bg-stone-100 text-stone-600 hover:bg-[#f1eaf4] hover:text-[#684477]"
                    }`
                  }
                >
                  {item.icon}
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Dashboard Content */}
          {isDashboard && (
            <div className="px-4 pt-8 sm:px-8 lg:px-10">
              <div className="rounded-2xl bg-[#684477] px-6 py-8 text-white shadow-sm sm:px-9">
                <p className="text-xs font-semibold uppercase tracking-widest text-purple-200">
                  Dashboard
                </p>

                <h1 className="mt-3 text-2xl font-bold sm:text-3xl">
                  Welcome back, {user?.username || "Admin"}!
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-purple-100">
                  Here's your workspace to manage users, customer
                  messages, orders and books.
                </p>
              </div>

              <section className="mt-8">
                <h2 className="text-lg font-bold text-stone-900">
                  Quick Actions
                </h2>
                <p className="mt-1 text-sm text-stone-500">
                  Choose what you want to manage.
                </p>

                <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {navItems.slice(1).map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="group rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#cbb5d5] hover:shadow-md"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f1eaf4] text-lg text-[#684477] transition group-hover:bg-[#684477] group-hover:text-white">
                        {item.icon}
                      </div>

                      <h3 className="mt-4 font-bold text-stone-900">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-sm text-stone-500">
                        {item.name === "Users" &&
                          "View and manage registered user accounts."}
                        {item.name === "Contacts" &&
                          "Review messages received from customers."}
                        {item.name === "Orders" &&
                          "View and manage customer orders."}
                        {item.name === "Add Book" &&
                          "Add a new book to your bookstore."}
                      </p>

                      <span className="mt-4 inline-block text-sm font-semibold text-[#684477]">
                        Open section →
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* Nested Page Content */}
          <div className="px-4 py-8 sm:px-8 lg:px-10">
            <Outlet />
          </div>

        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
