const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://jobboardbackend-production-b133.up.railway.app/api";

// GET all jobs
export const getJobs = async (category = "") => {
  const url = category
    ? `${BASE_URL}/jobs?category=${category}`
    : `${BASE_URL}/jobs`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }

  return res.json();
};

// GET single job
export const getJob = async (id) => {
  const res = await fetch(`${BASE_URL}/jobs/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch job");
  }

  return res.json();
};

// CREATE job
export const createJob = async (data) => {
  const res = await fetch(`${BASE_URL}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create job");
  }

  return res.json();
};

// UPDATE job
export const updateJob = async (id, data) => {
  const res = await fetch(`${BASE_URL}/jobs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update job");
  }

  return res.json();
};

// DELETE job
export const deleteJob = async (id) => {
  const res = await fetch(`${BASE_URL}/jobs/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete job");
  }

  return res.json();
};