import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const fetchJobs = (location, signal) =>
  API.get("/jobs", {
    params: location ? { location } : {},
    signal,
  });
