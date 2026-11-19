
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import API_BASE_URL from "../utils/api";

const AdminUsers = () => {
  const { authToken } = useAuth();

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingUserId, setDeletingUserId] = useState(null);

  // Fetch all users
  const getAllUsersData = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await fetch(`${API_BASE_URL}/api/admin/users`, {
        method: "GET",
        headers: {
          Authorization: authToken,
        },
      });

      const res_data = await response.json();

      if (response.status === 404) {
        setUsers([]);
        return;
      }

      if (!response.ok) {
        throw new Error(res_data.message || "Unable to fetch users.");
      }

      setUsers(
        Array.isArray(res_data.message) ? res_data.message : []
      );
    } catch (err) {
      console.error("Fetch users error:", err);
      setError(err.message || "Unable to fetch users.");
      toast.error(err.message || "Unable to fetch users.");
    } finally {
      setIsLoading(false);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      setDeletingUserId(id);

      const response = await fetch(
        `${API_BASE_URL}/api/admin/users/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authToken,
          },
        }
      );

      const res_data = await response.json();

      if (!response.ok) {
        throw new Error(res_data.message || "Unable to delete user.");
      }

      toast.success("User deleted successfully!");

      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== id)
      );
    } catch (err) {
      console.error("Delete user error:", err);
      toast.error(err.message || "Unable to delete user.");
    } finally {
      setDeletingUserId(null);
    }
  };

  useEffect(() => {
    if (authToken) {
      getAllUsersData();
    } else {
      setIsLoading(false);
    }
  }, [authToken]);

  return (
    <main className="min-h-screen bg-[#fffdf9] px-4 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">

        {/* Page heading */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#684477]">
              ADMINISTRATION
            </p>

            <h1 className="mt-2 text-3xl font-bold text-stone-900 sm:text-4xl">
              Manage Users
            </h1>

            <p className="mt-2 text-stone-500">
              View, update and manage registered users.
            </p>
          </div>

          <button
            type="button"
            onClick={getAllUsersData}
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-700 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span>↻</span>
            {isLoading ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {/* User count */}
        <div className="mb-6 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:max-w-xs">
          <p className="text-sm font-medium text-stone-500">
            Total registered users
          </p>

          <p className="mt-2 text-3xl font-bold text-[#684477]">
            {users.length}
          </p>
        </div>

        {/* Users table */}
        <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">

          <div className="border-b border-stone-200 px-6 py-5">
            <h2 className="text-lg font-bold text-stone-900">
              All Users
            </h2>
            <p className="mt-1 text-sm text-stone-500">
              Manage user accounts and their information.
            </p>
          </div>

          {isLoading ? (
            <div className="flex min-h-64 items-center justify-center">
              <p className="font-medium text-stone-500">
                Loading users...
              </p>
            </div>
          ) : error ? (
            <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
              <p className="font-semibold text-red-600">{error}</p>

              <button
                onClick={getAllUsersData}
                className="mt-4 rounded-lg bg-[#684477] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#543563]"
              >
                Try Again
              </button>
            </div>
          ) : users.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-stone-100 text-2xl">
                <span>👥</span>
              </div>

              <h3 className="mt-4 text-lg font-bold text-stone-800">
                No users found
              </h3>

              <p className="mt-2 text-sm text-stone-500">
                There are currently no registered users.
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[750px] text-left">
                  <thead className="bg-stone-50">
                    <tr className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                      <th className="px-6 py-4">User</th>
                      <th className="px-6 py-4">Email Address</th>
                      <th className="px-6 py-4">Phone Number</th>
                      <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-stone-100">
                    {users.map((curUser) => (
                      <tr
                        key={curUser._id}
                        className="transition hover:bg-[#fcfafc]"
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f1eaf4] font-bold text-[#684477]">
                              {curUser.username?.charAt(0).toUpperCase() || "U"}
                            </div>

                            <span className="font-semibold text-stone-800">
                              {curUser.username}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-5 text-sm text-stone-600">
                          {curUser.email}
                        </td>

                        <td className="px-6 py-5 text-sm text-stone-600">
                          {curUser.phone || "Not provided"}
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex items-center justify-center gap-3">
                            <Link
                              to={`/admin/users/${curUser._id}/edit`}
                              className="rounded-lg bg-[#f1eaf4] px-4 py-2 text-sm font-semibold text-[#684477] transition hover:bg-[#e7d9ed]"
                            >
                              Edit
                            </Link>

                            <button
                              type="button"
                              onClick={() => deleteUser(curUser._id)}
                              disabled={deletingUserId === curUser._id}
                              className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {deletingUserId === curUser._id
                                ? "Deleting..."
                                : "Delete"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="border-t border-stone-200 px-6 py-4">
                <p className="text-sm text-stone-500">
                  Showing {users.length}{" "}
                  {users.length === 1 ? "user" : "users"}
                </p>
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
};

export default AdminUsers;
