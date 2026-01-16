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
      <div className="flex-[2.1] flex items-center justify-center text-gray-500">
        Select a job to view details
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
    <div className="flex-[2.1] p-6 overflow-y-auto ">
      <div className="flex justify-between items-start mb-6 border-b pb-4 border-l-4 border-blue-500 p-4 bg-gradient-to-r from-blue-50 via-blue-100/60 to-white transition-colors duration-200">
        <div className="flex items-center gap-4 ">
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
            className="px-4 py-2 text-white text-sm rounded
             bg-blue-600
             hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700
             hover:shadow-md
             transition-all duration-200"
          >
            Apply
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 border text-sm rounded hover:bg-gradient-to-r hover:from-gray-100 hover:to-grey-70
             hover:shadow-md
             transition-all duration-200"
          >
            <Share2 size={16} />
            Share
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6 text-md text-gray-700 border-b pb-4">
        <div className="flex items-center gap-2">
          <Briefcase size={16} className="text-blue-400" />
          <span>
            <strong>Experience:</strong> {job.experience}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-blue-400" />
          <span>
            <strong>Posted:</strong> {job.postedDateTime?.slice(0, 10)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-blue-400" />
          <span>
            <strong>Location:</strong> {job.location}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <LinkIcon size={16} className="text-blue-400" />
          <span>
            <strong>Source:</strong> {job.source}
          </span>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-2">Job Description</h3>
      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
        {job.description ? (
          job.description
        ) : (
          <>
            We are seeking a motivated and detail-oriented{" "}
            <strong>{job.title}</strong> to join our growing team. In this role,
            you will be responsible for executing key initiatives that drive our
            core business objectives while collaborating with cross-functional
            teams to ensure high-quality delivery. The ideal candidate is a
            proactive problem-solver with strong communication skills and a
            passion for staying ahead of industry trends. If you thrive in a
            fast-paced environment and are looking for an opportunity to make a
            tangible impact while advancing your professional skills, we want to
            hear from you.
          </>
        )}
      </p>
    </div>
  );
};

export default JobDetails;
