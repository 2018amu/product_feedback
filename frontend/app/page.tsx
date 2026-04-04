"use client";

import { useState } from "react";
import { submitFeedback } from "../components/lib/api";

export default function Home() {
  const maxLength = 200;
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Feature Request",
    submitterName: "",
    submitterEmail: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    //validation 
    if (!form.title || form.description.length < 20) {
      setMessage("Please fill all fields correctly");
      return;
    }

    setLoading(true);

    const res = await submitFeedback(form);

    setLoading(false);

    if (res.success) {
      setMessage(" Feedback submitted successfully!");
      //reset after submitting.
      setForm({
        title: "",
        description: "",
        category: "Feature Request",
        submitterName: "",
        submitterEmail: "",
      });
    } else {
      setMessage(" Something went wrong");
    }
  };

  return (
 <main className="min-h-screen flex bg-gray-100 dark:bg-gray-900">

  {/* Left Branding Panel */}
  <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-600 to-blue-700 text-white items-center justify-center p-12">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold mb-4 tracking-tight">
        FeedPulse
      </h1>
      <p className="text-lg text-blue-100 mb-6">
        AI-powered feedback platform designed to capture insights, organize ideas, and help teams build better products.
      </p>

      <div className="space-y-3 text-blue-100 text-sm">
        <p>✓ Centralized feedback collection</p>
        <p>✓ Smart categorization & insights</p>
        <p>✓ Faster product decisions</p>
      </div>
    </div>
  </div>

  {/* Right Form Panel */}
  <div className="w-full lg:w-1/2 flex items-center justify-center p-6">

    <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 transition-all">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Submit Feedback
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Share your thoughts to help improve the product
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Feedback title"
          className="w-full p-3 text-sm border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />
        <textarea
          placeholder="Describe your feedback..."
          className="w-full p-3 text-sm border rounded-lg h-28 resize-none bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
          value={form.description}
          maxLength={maxLength}
          onChange={(e) => {
            const value = e.target.value.slice(0, maxLength);
            setForm({ ...form, description: value });
          }}
        />
        <div className="flex justify-end mt-1 text-xs">
        <span
          className={`${
            form.description.length > maxLength - 20
              ? "text-red-500"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {form.description.length} / {maxLength}
        </span>
      </div>

        <select
          className="w-full p-3 text-sm border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        >
          <option value="Bug">🐛 Bug Report</option>
          <option value="Feature Request">✨ Feature Request</option>
          <option value="Improvement">⚡ Improvement</option>
          <option value="Other">📌 Other</option>
        </select>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Type Your name "
            className="p-3 text-sm border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            value={form.submitterName}
            onChange={(e) =>
              setForm({ ...form, submitterName: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Your email (optional)"
            className="p-3 text-sm border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            value={form.submitterEmail}
            onChange={(e) =>
              setForm({ ...form, submitterEmail: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium text-sm hover:bg-blue-700 active:scale-[0.98] transition"
        >
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>

      {/* Message */}
      {message && (
        <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
          {message}
        </p>
      )}
    </div>
  </div>
</main>
  );
}