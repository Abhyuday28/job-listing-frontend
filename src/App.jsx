import { useEffect, useRef, useState } from "react";
import { fetchJobs } from "./services/api";
import SearchBar from "./components/SearchBar";
import JobList from "./components/JobList";
import JobDetails from "./components/JobDetails";

function App() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchLocation, setSearchLocation] = useState("");
  const controllerRef = useRef(null);

  useEffect(() => {
    
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    const loadJobs = async () => {
      try {
        const res = await fetchJobs(searchLocation, controller.signal);
        setJobs(res.data);
        setSelectedJob(res.data[0] || null);
      } catch (err) {
        if (err.name !== "CanceledError") {
          console.error("Fetch error:", err);
        }
      }
    };

    loadJobs();

    return () => controller.abort();
  }, [searchLocation]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-semibold mb-4">Job Listings</h1>

        <SearchBar onSearch={setSearchLocation} />

        <div className="flex h-[75vh] border rounded overflow-hidden w-full">
          <JobList
            jobs={jobs}
            selectedId={selectedJob?._id}
            onSelect={setSelectedJob}
          />
          <JobDetails job={selectedJob} />
        </div>
      </div>
    </div>
  );
}

export default App;
