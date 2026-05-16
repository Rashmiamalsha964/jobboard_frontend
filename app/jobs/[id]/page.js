"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import { getJob, updateJob, deleteJob } from "@/lib/api";

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

        const data = await getJob(id);
        setJob(data);

      } catch (err) {
        setError(err.message || "Error loading job");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchJob();
  }, [id]);

  // Update status
  const handleStatusChange = async (newStatus) => {
    try {
      await updateJob(id, { status: newStatus });

      setJob((prev) => ({
        ...prev,
        status: newStatus,
      }));

    } catch (err) {
      alert("Failed to update status");
    }
  };

  // Delete job
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      await deleteJob(id);
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

        <Link href="/" className="text-blue-600 mb-4 inline-block">
          ← Go to main page
        </Link>

        <h1 className="text-3xl font-bold mb-3">{job.title}</h1>

        <div className="flex gap-2 mb-5">
          <span>{job.category}</span>
          <span>{job.location}</span>
          <span>{job.status}</span>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold">Job Description</h2>
          <p>{job.description}</p>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold">Contact</h2>
          <p>{job.contactName}</p>
          <p>{job.contactEmail}</p>
        </div>

        <div className="flex justify-between border-t pt-4">
          <select
            value={job.status}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            <option>Open</option>
            <option>In Progress</option>
            <option>Closed</option>
          </select>

          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete Job
          </button>
        </div>
      </div>
    </main>
  );
}