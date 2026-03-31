"use client";

import { useState } from "react";
import { submitFeedback } from "../components/lib/api";

export default function Home() {
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

    if (!form.title || form.description.length < 20) {
      setMessage("Please fill all fields correctly");
      return;
    }

    setLoading(true);

    const res = await submitFeedback(form);

    setLoading(false);

    if (res.success) {
      setMessage(" Feedback submitted successfully!");
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
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">
        
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          FeedPulse
        </h1>
        <p className="text-gray-500 mb-6">
          Share your product feedback. Help us improve 
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

{/* Title */}
<input
  id="title"
  name="title"
  type="text"
  placeholder="Feedback Title"
  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
  value={form.title}
  onChange={(e) =>
    setForm({ ...form, title: e.target.value })
  }
/>

{/* Description */}
<div>
  <textarea
    id="description"
    name="description"
    placeholder="Describe your feedback (min 20 characters)"
    className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500 outline-none"
    value={form.description}
    onChange={(e) =>
      setForm({ ...form, description: e.target.value })
    }
  />
  <p className="text-sm text-gray-400 text-right">
    {form.description.length}/200
  </p>
</div>

{/* Category */}
<select
  id="category"
  name="category"
  className="w-full p-3 border rounded-lg"
  value={form.category}
  onChange={(e) =>
    setForm({ ...form, category: e.target.value })
  }
>
  <option value="Bug">Bug</option>
  <option value="Feature Request">Feature Request</option>
  <option value="Improvement">Improvement</option>
  <option value="Other">Other</option>
</select>

{/* Name */}
<input
  id="submitterName"
  name="submitterName"
  type="text"
  placeholder="Your Name (optional)"
  className="w-full p-3 border rounded-lg"
  value={form.submitterName}
  onChange={(e) =>
    setForm({ ...form, submitterName: e.target.value })
  }
/>

{/* Email */}
<input
  id="submitterEmail"
  name="submitterEmail"
  type="email"
  placeholder="Your Email (optional)"
  className="w-full p-3 border rounded-lg"
  value={form.submitterEmail}
  onChange={(e) =>
    setForm({ ...form, submitterEmail: e.target.value })
  }
/>

{/* Button */}
<button
  type="submit"
  className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
>
  {loading ? "Submitting..." : "Submit Feedback"}
</button>
</form>

        {/* Message */}
        {message && (
          <p className="mt-4 text-center text-sm text-gray-600">
            {message}
          </p>
        )}
      </div>
    </main>
  );
}