
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import API_BASE_URL from "../utils/api";

const AdminUpdate = () => {
    const { id } = useParams();
    const { authToken } = useAuth();

    const [data, setData] = useState({
        username: "",
        email: "",
        phone: "",
    });

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");

    // Fetch user details
    const getSingleUserData = async () => {
        try {
            setIsLoading(true);
            setError("");

            const response = await fetch(
                `${API_BASE_URL}/api/admin/users/${id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: authToken,
                    },
                }
            );

            const res_data = await response.json();

            if (!response.ok) {
                throw new Error(res_data.message || "Unable to fetch user details.");
            }

            setData({
                username: res_data.data?.username || "",
                email: res_data.data?.email || "",
                phone: res_data.data?.phone || "",
            });
        } catch (err) {
            console.error(err);
            setError(err.message || "Something went wrong.");
            toast.error(err.message || "Unable to fetch user details.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (authToken && id) {
            getSingleUserData();
        }
    }, [id, authToken]);

    // Handle input changes
    const handleInput = (e) => {
        const { name, value } = e.target;

        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Update user
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!data.username.trim() || !data.email.trim() || !data.phone.trim()) {
            toast.error("Please fill in all fields.");
            return;
        }

        try {
            setIsSaving(true);

            const response = await fetch(
                `${API_BASE_URL}/api/admin/users/update/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: authToken,
                    },
                    body: JSON.stringify(data),
                }
            );

            const res_data = await response.json();

            if (!response.ok) {
                throw new Error(res_data.message || "User could not be updated.");
            }

            toast.success("User updated successfully!");
        } catch (err) {
            console.error(err);
            toast.error(err.message || "Something went wrong.");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-purple-100 border-t-[#684477]"></div>
                    <p className="mt-4 text-sm text-stone-500">
                        Loading user details...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-2xl border border-red-100 bg-red-50 p-8 text-center">
                <h2 className="text-lg font-semibold text-red-800">
                    Unable to load user
                </h2>
                <p className="mt-2 text-sm text-red-600">{error}</p>

                <button
                    onClick={getSingleUserData}
                    className="mt-5 rounded-lg bg-[#684477] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#563763]"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl space-y-6">

            {/* Page Header */}
            <div>
                <Link
                    to="/admin/users"
                    className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 transition hover:text-[#684477]"
                >
                    <span>←</span>
                    Back to Users
                </Link>

                <div className="mt-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#684477]">
                        User Management
                    </p>

                    <h1 className="mt-2 text-2xl font-bold text-stone-800 sm:text-3xl">
                        Edit User
                    </h1>

                    <p className="mt-2 text-sm text-stone-500">
                        Update the user's account information.
                    </p>
                </div>
            </div>

            {/* Form Card */}
            <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">

                <div className="border-b border-stone-100 bg-[#fffdf9] px-6 py-5 sm:px-8">
                    <h2 className="text-lg font-semibold text-stone-800">
                        Account Information
                    </h2>
                    <p className="mt-1 text-sm text-stone-500">
                        Make changes to the details below.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">

                    {/* Username */}
                    <div>
                        <label
                            htmlFor="username"
                            className="mb-2 block text-sm font-medium text-stone-700"
                        >
                            Username
                        </label>

                        <input
                            type="text"
                            name="username"
                            id="username"
                            required
                            autoComplete="off"
                            value={data.username}
                            onChange={handleInput}
                            placeholder="Enter username"
                            className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-[#684477] focus:ring-2 focus:ring-[#684477]/10"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium text-stone-700"
                        >
                            Email Address
                        </label>

                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            autoComplete="off"
                            value={data.email}
                            onChange={handleInput}
                            placeholder="Enter email address"
                            className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-[#684477] focus:ring-2 focus:ring-[#684477]/10"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label
                            htmlFor="phone"
                            className="mb-2 block text-sm font-medium text-stone-700"
                        >
                            Mobile Number
                        </label>

                        <input
                            type="tel"
                            name="phone"
                            id="phone"
                            required
                            autoComplete="off"
                            value={data.phone}
                            onChange={handleInput}
                            placeholder="Enter mobile number"
                            className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-[#684477] focus:ring-2 focus:ring-[#684477]/10"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col-reverse gap-3 border-t border-stone-100 pt-6 sm:flex-row sm:justify-end">

                        <Link
                            to="/admin/users"
                            className="rounded-xl border border-stone-200 px-6 py-3 text-center text-sm font-medium text-stone-600 transition hover:bg-stone-50"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            disabled={isSaving}
                            className="rounded-xl bg-[#684477] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#563763] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSaving ? "Saving Changes..." : "Save Changes"}
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminUpdate;
