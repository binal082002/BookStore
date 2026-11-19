
import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import API_BASE_URL from "../utils/api";

const AdminContacts = () => {
  const { authToken } = useAuth();

  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingContactId, setDeletingContactId] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);

  const getAllContacts = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/api/admin/contacts`,
        {
          method: "GET",
          headers: {
            Authorization: authToken,
          },
        }
      );

      const res_data = await response.json();

      if (response.status === 404) {
        setContacts([]);
        return;
      }

      if (!response.ok) {
        throw new Error(
          res_data.message || "Unable to fetch contact messages."
        );
      }

      setContacts(
        Array.isArray(res_data.message) ? res_data.message : []
      );
    } catch (err) {
      console.error("Fetch contacts error:", err);
      setError(err.message || "Unable to fetch contact messages.");
      toast.error(err.message || "Unable to fetch contact messages.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteContact = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this contact message?"
    );

    if (!confirmDelete) return;

    try {
      setDeletingContactId(id);

      const response = await fetch(
        `${API_BASE_URL}/api/admin/contacts/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authToken,
          },
        }
      );

      const res_data = await response.json();

      if (!response.ok) {
        throw new Error(
          res_data.message || "Unable to delete contact message."
        );
      }

      toast.success("Contact message deleted successfully!");

      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact._id !== id)
      );

      if (selectedContact?._id === id) {
        setSelectedContact(null);
      }
    } catch (err) {
      console.error("Delete contact error:", err);
      toast.error(err.message || "Unable to delete contact message.");
    } finally {
      setDeletingContactId(null);
    }
  };

  useEffect(() => {
    if (authToken) {
      getAllContacts();
    } else {
      setIsLoading(false);
    }
  }, [authToken]);

  return (
    <main className="mx-auto w-full max-w-7xl">

      {/* Page Heading */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-[#684477]">
            CUSTOMER SUPPORT
          </p>

          <h1 className="mt-2 text-3xl font-bold text-stone-900 sm:text-4xl">
            Contact Messages
          </h1>

          <p className="mt-2 text-sm text-stone-500 sm:text-base">
            View and manage messages submitted by your customers.
          </p>
        </div>

        <button
          type="button"
          onClick={getAllContacts}
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-700 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-50 sm:self-auto"
        >
          <span>↻</span>
          {isLoading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Contact Count */}
      <div className="mb-6 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:max-w-xs">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-stone-500">
              Total Messages
            </p>

            <p className="mt-2 text-3xl font-bold text-[#684477]">
              {contacts.length}
            </p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f1eaf4] text-xl text-[#684477]">
            <span>✉</span>
          </div>
        </div>
      </div>

      {/* Contacts Table */}
      <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">

        <div className="border-b border-stone-200 px-6 py-5">
          <h2 className="text-lg font-bold text-stone-900">
            All Messages
          </h2>

          <p className="mt-1 text-sm text-stone-500">
            Customer enquiries received through the contact form.
          </p>
        </div>

        {isLoading ? (
          <div className="flex min-h-64 items-center justify-center">
            <p className="font-medium text-stone-500">
              Loading contact messages...
            </p>
          </div>
        ) : error ? (
          <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
            <p className="font-semibold text-red-600">{error}</p>

            <button
              type="button"
              onClick={getAllContacts}
              className="mt-4 rounded-lg bg-[#684477] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#543563]"
            >
              Try Again
            </button>
          </div>
        ) : contacts.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-stone-100 text-2xl">
              <span>✉</span>
            </div>

            <h3 className="mt-4 text-lg font-bold text-stone-800">
              No messages yet
            </h3>

            <p className="mt-2 text-sm text-stone-500">
              Customer messages will appear here when submitted.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[750px] text-left">
                <thead className="bg-stone-50">
                  <tr className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Email Address</th>
                    <th className="px-6 py-4">Message Preview</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-stone-100">
                  {contacts.map((curContact) => (
                    <tr
                      key={curContact._id}
                      className="transition hover:bg-[#fcfafc]"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f1eaf4] font-bold text-[#684477]">
                            {curContact.username?.charAt(0).toUpperCase() || "C"}
                          </div>

                          <span className="font-semibold text-stone-800">
                            {curContact.username || "Unknown"}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-5 text-sm text-stone-600">
                        {curContact.email}
                      </td>

                      <td className="max-w-xs px-6 py-5">
                        <p className="truncate text-sm text-stone-600">
                          {curContact.message}
                        </p>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedContact(curContact)}
                            className="rounded-lg bg-[#f1eaf4] px-4 py-2 text-sm font-semibold text-[#684477] transition hover:bg-[#e7d9ed]"
                          >
                            View
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteContact(curContact._id)}
                            disabled={deletingContactId === curContact._id}
                            className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {deletingContactId === curContact._id
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
                Showing {contacts.length}{" "}
                {contacts.length === 1 ? "message" : "messages"}
              </p>
            </div>
          </>
        )}
      </section>

      {/* View Message Modal */}
      {selectedContact && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedContact(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#684477]">
                  CUSTOMER MESSAGE
                </p>

                <h2
                  id="contact-modal-title"
                  className="mt-2 text-xl font-bold text-stone-900"
                >
                  Message Details
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedContact(null)}
                aria-label="Close message"
                className="rounded-lg px-3 py-1 text-xl text-stone-500 transition hover:bg-stone-100 hover:text-stone-900"
              >
                ×
              </button>
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase text-stone-400">
                  Name
                </p>
                <p className="mt-1 font-semibold text-stone-800">
                  {selectedContact.username || "Unknown"}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-stone-400">
                  Email
                </p>
                <a
                  href={`mailto:${selectedContact.email}`}
                  className="mt-1 inline-block break-all font-medium text-[#684477] hover:underline"
                >
                  {selectedContact.email}
                </a>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-stone-400">
                  Message
                </p>

                <div className="mt-2 max-h-64 overflow-y-auto whitespace-pre-wrap break-words rounded-xl bg-stone-50 p-4 text-sm leading-7 text-stone-700">
                  {selectedContact.message}
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setSelectedContact(null)}
                className="rounded-lg border border-stone-300 px-5 py-2.5 text-sm font-semibold text-stone-600 transition hover:bg-stone-100"
              >
                Close
              </button>

              <a
                href={`mailto:${selectedContact.email}`}
                className="rounded-lg bg-[#684477] px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[#543563]"
              >
                Reply via Email
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default AdminContacts;
