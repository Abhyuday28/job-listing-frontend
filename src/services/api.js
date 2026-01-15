import axios from "axios";

const API = axios.create({
  baseURL: "https://job-listing-backend-production-234d.up.railway.app/api",
});

export const fetchJobs = (location, signal) =>
  API.get("/jobs", {
    params: location ? { location } : {},
    signal,
  });
