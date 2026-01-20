import axios from "axios";

const API = axios.create({
  baseURL: "https://job-listing-backend-production-234d.up.railway.app/api",
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