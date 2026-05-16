"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createJob } from "@/lib/api";

export default function NewJob() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Plumbing",
    location: "",
    contactName: "",
    contactEmail: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title.trim()) return setError("Title is required");
    if (!formData.description.trim()) return setError("Description is required");
    if (!formData.contactEmail.includes("@"))
      return setError("Valid email required");

   try {
  setLoading(true);

  const res = await createJob(formData);

  console.log("CREATE RESPONSE:", res);

  if (res.error || res.success === false) {
    throw new Error(res.message || "Failed to create job");
  }

  alert("Job created successfully!");
  router.push("/");
} catch (err) {
  setError(err.message);
} finally {
  setLoading(false);
}
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

      <div className="w-full max-w-xl bg-white rounded-2xl shadow p-6 sm:p-8">

        {/* BACK BUTTON */}
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:underline mb-4"
        >
          ← Go to main page
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          Post a Service Request
        </h1>

        {error && (
          <p className="text-red-600 text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            className="border p-3 rounded-lg"
            placeholder="Job Title *"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <textarea
            className="border p-3 rounded-lg h-28"
            placeholder="Description *"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <select
            className="border p-3 rounded-lg"
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option>Plumbing</option>
            <option>Electrical</option>
            <option>Painting</option>
            <option>Joinery</option>
          </select>

          <input
            className="border p-3 rounded-lg"
            placeholder="Location"
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          />

          <input
            className="border p-3 rounded-lg"
            placeholder="Your Name"
            onChange={(e) =>
              setFormData({ ...formData, contactName: e.target.value })
            }
          />

          <input
            className="border p-3 rounded-lg"
            placeholder="Email *"
            type="email"
            onChange={(e) =>
              setFormData({ ...formData, contactEmail: e.target.value })
            }
          />

          <button
            disabled={loading}
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>

        </form>
      </div>
    </main>
  );
}