import { applyJob } from "../features/application/applicationSlice";
import { useDispatch, useSelector } from "react-redux";
const JobCard = ({ job }) => {
  // console.log("Job card")
  const dispatch = useDispatch();
  const { appliedJobs, loading, error } = useSelector(
    (state) => state.application,
  );

  const isApplied = appliedJobs.includes(job._id);

  const handleApply = () => {
    dispatch(applyJob(job._id));
  };

  return (
    <div className="border rounded p-4 bg-white dark:bg-gray-800 shadow">
      <h3 className="text-lg font-bold">{job.title}</h3>
      <p className="text-sm text-gray-500">{job.location}</p>
      <p className="mt-2 text-sm">{job.description.slice(0, 100)}...</p>
      <p className="mt-2 text-xs font-semibold">Type: {job.jobType}</p>
      <button
        disabled={isApplied || loading}
        onClick={handleApply}
        className={`mt-4 w-full py-2 rounded text-white ${
          isApplied ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isApplied ? "Applied" : "Apply Now"}
      </button>
    </div>
  );
};

export default JobCard;
