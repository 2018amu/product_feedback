"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("createdAt");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

  const fetchData = async () => {
    const res = await fetch(
      `http://localhost:4000/api/feedback?search=${search}&category=${category}&status=${status}&sort=${sort}&page=${page}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const result = await res.json();
    setData(result.data || []);
    setPages(result.pagination?.pages || 1);
  };

  const fetchStats = async () => {
    const res = await fetch("http://localhost:4000/api/feedback/stats", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const result = await res.json();
    setStats(result.data || {});
  };

  useEffect(() => {
    fetchData();
    fetchStats();
  }, [search, category, status, sort, page]);

  return (
  <div className="flex min-h-screen bg-gray-100">

  {/* SIDEBAR */}
  <aside className="w-64 bg-gray-900 text-white p-6 hidden md:flex flex-col">
    <h2 className="text-xl font-bold mb-8">FeedPulse</h2>

    <nav className="space-y-4 text-sm">
      <div className="bg-gray-800 p-2 rounded">Dashboard</div>
      <div className="text-gray-400">Feedback</div>
      <div className="text-gray-400">Analytics</div>
      <div className="text-gray-400">Settings</div>
    </nav>

    <div className="mt-auto text-xs text-gray-400">
      Admin Panel
    </div>
  </aside>

  {/* MAIN CONTENT */}
  <div className="flex-1 flex flex-col">

    {/* TOP BAR */}
    <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold text-gray-800">
        Dashboard
      </h1>
      <div className="text-sm text-gray-500">
        Welcome Admin 👋
      </div>
    </div>

    {/* CONTENT */}
    <div className="p-6">

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[
          { label: "Total Feedback", value: stats.total },
          { label: "Open Issues", value: stats.open },
          { label: "Avg Priority", value: stats.avgPriority?.toFixed(1) },
          { label: "Top Tag", value: stats.topTag },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-xl border shadow-sm"
          >
            <p className="text-sm text-gray-500">{item.label}</p>
            <h2 className="text-2xl font-semibold mt-2 text-gray-800">
              {item.value || 0}
            </h2>
          </div>
        ))}
      </div>

      {/* FILTER BAR */}
      <div className="bg-white p-4 rounded-xl border mb-6 flex flex-wrap gap-3">
        <input
          placeholder="Search feedback..."
          className="flex-1 min-w-[200px] border rounded-lg px-3 py-2 text-sm"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded-lg px-3 py-2 text-sm"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>All Categories</option>
          <option>Bug</option>
          <option>Feature Request</option>
          <option>Improvement</option>
          <option>Other</option>
        </select>

        <select
          className="border rounded-lg px-3 py-2 text-sm"
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>All Status</option>
          <option>New</option>
          <option>In Review</option>
          <option>Resolved</option>
        </select>

        <select
          className="border rounded-lg px-3 py-2 text-sm"
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="createdAt">Newest</option>
          <option value="ai_priority">Priority</option>
        </select>
      </div>

      {/* FEEDBACK TABLE STYLE */}
      <div className="bg-white rounded-xl border overflow-hidden">

        <div className="grid grid-cols-6 bg-gray-50 text-xs font-medium text-gray-500 px-4 py-3">
          <div className="col-span-2">Title</div>
          <div>Category</div>
          <div>Sentiment</div>
          <div>Priority</div>
          <div>Status</div>
        </div>

        {data.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-6 px-4 py-4 border-t text-sm items-center hover:bg-gray-50"
          >
            <div className="col-span-2">
              <p className="font-medium text-gray-800">{item.title}</p>
              <p className="text-xs text-gray-500 truncate">
                {item.ai_summary}
              </p>
            </div>

            <div className="text-gray-600">{item.category}</div>

            <div>
              <span
                className={`text-xs px-2 py-1 rounded ${
                  item.ai_sentiment === "Positive"
                    ? "bg-green-100 text-green-700"
                    : item.ai_sentiment === "Negative"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {item.ai_sentiment}
              </span>
            </div>

            <div className="text-blue-600 font-medium">
              {item.ai_priority}
            </div>

            <div>
              <select
                value={item.status}
                onChange={async (e) => {
                  await fetch(
                    `http://localhost:4000/api/feedback/${item._id}`,
                    {
                      method: "PATCH",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                      body: JSON.stringify({ status: e.target.value }),
                    }
                  );
                  fetchData();
                }}
                className="border rounded px-2 py-1 text-xs"
              >
                <option>New</option>
                <option>In Review</option>
                <option>Resolved</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-end mt-6 gap-2">
        {[...Array(pages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 text-sm rounded ${
              page === i + 1
                ? "bg-gray-900 text-white"
                : "bg-white border hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

    </div>
  </div>
</div>
  );
}