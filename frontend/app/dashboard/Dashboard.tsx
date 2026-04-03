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
    <div className="p-6 bg-gray-50 min-h-screen">

      
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <p>Total</p>
          <h2 className="text-xl font-bold">{stats.total}</h2>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p>Open</p>
          <h2 className="text-xl font-bold">{stats.open}</h2>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p>Avg Priority</p>
          <h2 className="text-xl font-bold">
            {stats.avgPriority?.toFixed(1)}
          </h2>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p>Top Tag</p>
          <h2 className="text-xl font-bold">{stats.topTag}</h2>
        </div>
      </div>

      {/* 🔍 FILTERS */}
      <div className="flex gap-4 mb-4">
        <input
          placeholder="Search..."
          className="border p-2 rounded w-full"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setCategory(e.target.value)}>
          <option>All</option>
          <option>Bug</option>
          <option>Feature Request</option>
          <option>Improvement</option>
          <option>Other</option>
        </select>

        <select onChange={(e) => setStatus(e.target.value)}>
          <option>All</option>
          <option>New</option>
          <option>In Review</option>
          <option>Resolved</option>
        </select>

        <select onChange={(e) => setSort(e.target.value)}>
          <option value="createdAt">Newest</option>
          <option value="ai_priority">Priority</option>
        </select>
      </div>

      {/* 📋 FEEDBACK LIST */}
      <div className="grid gap-4">
        {data.map((item) => (
          <div key={item._id} className="bg-white p-4 rounded shadow">

            <h2 className="font-bold">{item.title}</h2>
            <p className="text-sm text-gray-500">{item.ai_summary}</p>

            <div className="flex gap-2 mt-2">

              {/* SENTIMENT */}
              <span
                className={`px-2 py-1 rounded text-sm ${
                  item.ai_sentiment === "Positive"
                    ? "bg-green-100 text-green-700"
                    : item.ai_sentiment === "Negative"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100"
                }`}
              >
                {item.ai_sentiment}
              </span>

              {/* PRIORITY */}
              <span className="bg-blue-100 px-2 py-1 rounded text-sm">
                {item.ai_priority}
              </span>

              {/* CATEGORY */}
              <span className="bg-purple-100 px-2 py-1 rounded text-sm">
                {item.category}
              </span>

              {/* STATUS UPDATE */}
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
                className="border rounded px-2"
              >
                <option>New</option>
                <option>In Review</option>
                <option>Resolved</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {/*  PAGINATION */}
      <div className="flex gap-2 mt-6">
        {[...Array(pages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}