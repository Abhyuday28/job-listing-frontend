const JobList = ({ jobs, onSelect, selectedId }) => {
  return (
    <div className="flex-[0.9] bg-gray-50 overflow-y-auto border-r overflow-x-hidden">
      {jobs.map((job) => (
        <div
          key={job._id}
          onClick={() => onSelect(job)}
          className={`flex gap-3 p-4 cursor-pointer border-b hover:bg-gray-100 transition ${
            selectedId === job._id
              ? "bg-blue-50 border-l-4 border-blue-500"
              : ""
          }`}
        >
        
          <div className="flex-shrink-0">
            {job.companyImageUrl ? (
              <img
                src={job.companyImageUrl}
                alt={job.company}
                className="w-10 h-10 rounded-full object-contain border bg-white"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-300" />
            )}
          </div>

        
          <div>
            <h3 className="font-medium text-gray-900 leading-tight">
              {job.title}
            </h3>
            <p className="text-sm text-gray-600">{job.company}</p>
            <p className="text-xs text-gray-500 mt-1">{job.location}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobList;
