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
<main className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">

{/* Card */}
<div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-7">

  {/* Header */}
  <div className="text-center mb-5">
    <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
      Submit Feedback
    </h1>
    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
      Share your thoughts to improve the product
    </p>
  </div>

  {/* Form */}
  <form onSubmit={handleSubmit} className="space-y-3">

    {/* Title */}
    <input
      type="text"
      placeholder="Feedback title"
      className="w-full p-2.5 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
      value={form.title}
      onChange={(e) =>
        setForm({ ...form, title: e.target.value })
      }
    />

    {/* Description */}
    <textarea
      placeholder="Describe your feedback..."
      className="w-full p-2.5 text-sm rounded-md h-24 resize-none border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
      value={form.description}
      maxLength={maxLength}
      onChange={(e) => {
        const value = e.target.value.slice(0, maxLength);
        setForm({ ...form, description: value });
      }}
    />

    {/* Counter */}
    <div className="flex justify-end text-[11px]">
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

    {/* Category */}
    <select
      className="w-full p-2.5 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
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

    {/* Name + Email */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
      <input
        type="text"
        placeholder="Your name"
        className="p-2.5 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
        value={form.submitterName}
        onChange={(e) =>
          setForm({ ...form, submitterName: e.target.value })
        }
      />

      <input
        type="email"
        placeholder="Email (optional)"
        className="p-2.5 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
        value={form.submitterEmail}
        onChange={(e) =>
          setForm({ ...form, submitterEmail: e.target.value })
        }
      />
    </div>

    {/* Submit */}
    <button
      type="submit"
      className="w-full py-2.5 rounded-md font-medium text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 active:scale-[0.98] transition shadow-md"
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
</main>
  );
}