import {
  MapPin,
  Briefcase,
  Calendar,
  Link as LinkIcon,
  Share2,
} from "lucide-react";

const JobDetails = ({ job }) => {
  if (!job) {
    return (
      <div className="w-2/3 flex items-center justify-center text-gray-500">
        Loading.....
      </div>
    );
  }

  const handleApply = () => {
    if (job.job_link) {
      window.open(job.job_link, "_blank");
    }
  };

  const handleShare = () => {
    const shareText = `${job.title} - ${job.location}\n${job.job_link || ""}`;
    navigator.clipboard.writeText(shareText);
    alert("Job link copied to clipboard");
  };

  return (
    <div className="flex-[2.1] p-6 overflow-y-auto">
      
      <div className="flex justify-between items-start mb-6 border-b pb-4">
        <div className="flex items-center gap-4">
          
          {job.companyImageUrl ? (
            <img
              src={job.companyImageUrl}
              alt={job.company}
              className="w-14 h-14 rounded-full object-contain border bg-white"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-gray-200" />
          )}

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {job.title}
            </h2>

            {job.company_url ? (
              <a
                href={job.company_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm hover:underline"
              >
                {job.company}
              </a>
            ) : (
              <p className="text-sm text-gray-600">{job.company}</p>
            )}

            <p className="text-gray-500 text-sm">{job.location}</p>
          </div>
        </div>

        
        <div className="flex gap-2">
          <button
            onClick={handleApply}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
          >
            Apply
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 border text-sm rounded hover:bg-gray-100 transition"
          >
            <Share2 size={16} />
            Share
          </button>
        </div>
      </div>


      <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-700 border-b pb-4">
        <div className="flex items-center gap-2">
          <Briefcase size={16} className="text-gray-500" />
          <span><strong>Experience:</strong> {job.experience}</span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-gray-500" />
          <span><strong>Posted:</strong> {job.postedDateTime?.slice(0, 10)}</span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-gray-500" />
          <span><strong>Location:</strong> {job.location}</span>
        </div>

        <div className="flex items-center gap-2">
          <LinkIcon size={16} className="text-gray-500" />
          <span><strong>Source:</strong> {job.source}</span>
        </div>
      </div>

     
      <h3 className="font-semibold mb-2">Job Description</h3>
      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
        {job.description || "No description available."}
      </p>
    </div>
  );
};

export default JobDetails;
