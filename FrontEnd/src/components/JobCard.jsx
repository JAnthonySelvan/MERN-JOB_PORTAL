const JobCard = ({ job }) => {
    // console.log("Job card")
  return (
    <div className="border rounded p-4 bg-white dark:bg-gray-800 shadow">
      <h3 className="text-lg font-bold">{job.title}</h3>
      <p className="text-sm text-gray-500">{job.location}</p>
      <p className="mt-2 text-sm">{job.description.slice(0, 100)}...</p>
      <p className="mt-2 text-xs font-semibold">Type: {job.jobType}</p>
    </div>
  );
};

export default JobCard;
