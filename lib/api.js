const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// GET all jobs
export const getJobs = async (category = "") => {
  const url = category
    ? `${BASE_URL}/jobs?category=${category}`
    : `${BASE_URL}/jobs`;

  return fetch(url);
};

// GET single job
export const getJob = async (id) => {
  return fetch(`${BASE_URL}/jobs/${id}`);
};

// CREATE job
export const createJob = async (data) => {
  return fetch(`${BASE_URL}/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

// UPDATE job
export const updateJob = async (id, data) => {
  return fetch(`${BASE_URL}/jobs/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

// DELETE job
export const deleteJob = async (id) => {
  return fetch(`${BASE_URL}/jobs/${id}`, {
    method: "DELETE",
  });
};