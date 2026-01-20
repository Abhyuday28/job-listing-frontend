import { useEffect, useRef, useState, Suspense, lazy } from "react";
import { fetchJobs } from "./services/api";
import SearchBar from "./components/SearchBar";
import JobList from "./components/JobList";

const JobDetails = lazy(() => import("./components/JobDetails"));

function App() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchLocation, setSearchLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const controllerRef = useRef(null);
  const loadMoreRef = useRef(null);
  const listContainerRef = useRef(null);

  
  useEffect(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    const loadInitialJobs = async () => {
      setLoading(true);
      try {
        const res = await fetchJobs(searchLocation, controller.signal, {
          page: 1,
          limit: 15,
        });

        setJobs(res.data);
        setSelectedJob(res.data[0] || null);
        setHasMore(res.data.length === 15);
        setPage(1);
      } catch (err) {
        if (err.name !== "CanceledError") {
          console.error("Fetch error:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    loadInitialJobs();

    return () => controller.abort();
  }, [searchLocation]);

  
  const loadMoreJobs = async () => {
    if (loading || !hasMore) return;

    const nextPage = page + 1;
    setLoading(true);

    try {
      const res = await fetchJobs(
        searchLocation,
        controllerRef.current.signal,
        { page: nextPage, limit: 15 }
      );

      if (res.data.length === 0) {
        setHasMore(false);
        return;
      }

      setJobs(prev => [...prev, ...res.data]);
      setPage(nextPage);
    } catch (err) {
      if (err.name !== "CanceledError") {
        console.error("Load more error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          loadMoreJobs();
        }
      },
      {
        root: listContainerRef.current, 
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading, page]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">
          Job<span className="text-blue-500">Listings</span>
        </h1>

        <SearchBar onSearch={setSearchLocation} />

        <div className="flex h-[75vh] border rounded overflow-hidden w-full">
          
          <div
            ref={listContainerRef}
            className="w-1/3 overflow-y-auto border-r"
          >
            <JobList
              jobs={jobs}
              selectedId={selectedJob?._id}
              onSelect={setSelectedJob}
              loading={loading}
            />


            <div ref={loadMoreRef} className="h-1" />

            {loading && (
              <div className="py-2 text-center text-sm text-gray-400">
                Loading more jobs…
              </div>
            )}
          </div>

          
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
