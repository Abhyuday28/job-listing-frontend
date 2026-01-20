import { useEffect, useRef, useState } from "react";
import { fetchJobs } from "./services/api";
import SearchBar from "./components/SearchBar";
import JobList from "./components/JobList";
import { Suspense, lazy } from "react";

const JobDetails = lazy(() => import("./components/JobDetails"));

function App() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchLocation, setSearchLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const controllerRef = useRef(null);

  useEffect(() => {
    
    if (controllerRef.current && !controllerRef.current.signal.aborted) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    const loadJobs = async () => {
      setLoading(true);
      try {
        const res = await fetchJobs(searchLocation, controller.signal);

       
        const limitedJobs = res.data.slice(0, 15);

        setJobs(limitedJobs);
        setSelectedJob(limitedJobs[0] || null);
      } catch (err) {
        if (err.name !== "CanceledError") {
          console.error("Fetch error:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    loadJobs();

    return () => controller.abort();
  }, [searchLocation]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">
          Job<span className="text-blue-500">Listings</span>
        </h1>

        <SearchBar onSearch={setSearchLocation} />

        <div className="flex h-[75vh] border rounded overflow-hidden w-full">
          <JobList
            jobs={jobs}
            selectedId={selectedJob?._id}
            onSelect={setSelectedJob}
            loading={loading}
          />

          <Suspense
            fallback={
              <div className="w-2/3 flex items-center justify-center text-gray-400">
                Loading details…
              </div>
            }
          >
            {selectedJob && <JobDetails job={selectedJob} />}
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default App;
