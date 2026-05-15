"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getJobs } from "@/lib/api";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);

        const res = await getJobs(category);
        const data = await res.json();

        setJobs(data);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [category]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-600 text-lg">
        Loading jobs...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-6">

      {/* OUTER WRAPPER CARD */}
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-6 md:p-10">

        {/* HERO / WELCOME SECTION */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6 md:p-8 rounded-2xl mb-8 shadow-md">

          <h1 className="text-3xl md:text-4xl font-bold">
            👋 Welcome to Service Board
          </h1>

          <p className="mt-2 text-white/90">
            Find skilled workers or manage your service requests in one place.
          </p>

          <div className="mt-5 flex gap-3 flex-wrap">
            <Link
              href="/jobs/new"
              className="bg-white text-blue-600 px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              + Post a Request
            </Link>

            <span className="text-sm bg-white/20 px-3 py-2 rounded-lg">
              🚀 Fast • Simple • Reliable
            </span>
          </div>

        </div>

        {/* FILTER SECTION */}
        <div className="bg-gray-50 border rounded-xl p-4 mb-8 flex flex-col sm:flex-row sm:items-center gap-3">

          <label className="font-semibold text-gray-700">
            Filter Jobs:
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded-lg w-full sm:w-60 focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="">All Categories</option>
            <option>Plumbing</option>
            <option>Electrical</option>
            <option>Painting</option>
            <option>Joinery</option>
          </select>

        </div>

        {/* JOB GRID CARD CONTAINER */}
        <div className="bg-gray-50 p-4 md:p-6 rounded-2xl">

          <div className="grid gap-6 md:grid-cols-2">

            {jobs.map((job) => (
              <Link key={job._id} href={`/jobs/${job._id}`}>
                <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border border-gray-100">

                  {/* TITLE + STATUS */}
                  <div className="flex justify-between items-start mb-3">

                    <h2 className="text-lg font-bold text-gray-800">
                      {job.title}
                    </h2>

                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${
                        job.status === "Open"
                          ? "bg-green-100 text-green-700"
                          : job.status === "In Progress"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {job.status}
                    </span>

                  </div>

                  {/* DETAILS */}
                  <p className="text-gray-600 text-sm mb-2">
                    📍 {job.location || "No location"}
                  </p>

                  <p className="text-gray-500 text-sm">
                    🛠 {job.category}
                  </p>

                </div>
              </Link>
            ))}

          </div>

          {/* EMPTY STATE */}
          {jobs.length === 0 && (
            <div className="text-center py-16">
              <div className="text-5xl mb-3">📭</div>
              <h2 className="text-xl font-semibold text-gray-700">
                No jobs found
              </h2>
              <p className="text-gray-500 mt-2">
                Try changing filter or create a new request
              </p>

              <Link
                href="/jobs/new"
                className="inline-block mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
              >
                Create Job
              </Link>
            </div>
          )}

        </div>

      </div>
    </main>
  );
}