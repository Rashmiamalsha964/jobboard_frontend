"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function JobDetail() {
  const { id } = useParams();
  const router = useRouter();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch job
  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);

        const res = await fetch(`http://localhost:5000/api/jobs/${id}`);

        if (!res.ok) throw new Error("Failed to load job");

        const data = await res.json();
        setJob(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading job");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchJob();
  }, [id]);

  // Update status
  const handleStatusChange = async (newStatus) => {
    try {
      await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      setJob((prev) => ({ ...prev, status: newStatus }));
    } catch (err) {
      alert("Failed to update status");
    }
  };

  // Delete job
  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure you want to delete this job?");

    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: "DELETE",
      });

      router.push("/");
    } catch (err) {
      alert("Failed to delete job");
    }
  };

  // Loading UI
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-lg font-semibold">
        Loading...
      </div>
    );
  }

  // Error UI
  if (error) {
    return (
      <div className="h-screen flex items-center justify-center text-red-600 font-medium">
        {error}
      </div>
    );
  }

  if (!job) return null;

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6">

        {/* BACK BUTTON */}
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:underline mb-4"
        >
          ← Go to main page
        </Link>

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          {job.title}
        </h1>

        {/* TAGS */}
        <div className="flex flex-wrap gap-2 mb-5">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
            {job.category}
          </span>

          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
            {job.location}
          </span>

          <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
            {job.status}
          </span>
        </div>

        {/* DESCRIPTION */}
        <div className="bg-gray-50 border rounded-xl p-5 mb-6">
          <h2 className="text-lg font-semibold mb-2">
            Job Description
          </h2>

          <p className="text-gray-700 leading-7">
            {job.description}
          </p>
        </div>

        {/* CONTACT */}
        <div className="border rounded-xl p-5 mb-6">
          <h2 className="text-lg font-semibold mb-3">
            Contact Details
          </h2>

          <p className="mb-2">
            <span className="font-medium">Name:</span>{" "}
            {job.contactName || "N/A"}
          </p>

          <p>
            <span className="font-medium">Email:</span>{" "}
            <span className="text-blue-600">
              {job.contactEmail}
            </span>
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col md:flex-row justify-between gap-4 border-t pt-6">

          {/* STATUS */}
          <div className="w-full md:w-auto">
            <label className="block mb-2 font-medium">
              Update Status
            </label>

            <select
              value={job.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option>Open</option>
              <option>In Progress</option>
              <option>Closed</option>
            </select>
          </div>

          {/* DELETE BUTTON */}
          <div className="flex items-end">
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
            >
              Delete Job
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}