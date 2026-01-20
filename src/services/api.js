import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const fetchJobs = (
  location,
  signal,
  { page = 1, limit = 15 } = {}
) => {
  return API.get("/jobs", {
    params: {
      ...(location && { location }),
      page,
      limit,
    },
    signal,
  });
};