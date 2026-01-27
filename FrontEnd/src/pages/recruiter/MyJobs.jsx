import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyJobs } from "../../features/job/jobSlice";
import { Link } from "react-router-dom";

const MyJobs = () => {
  const dispatch = useDispatch();
  const { jobs } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchMyJobs());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Jobs</h2>

      {jobs.map((job) => (
        <div key={job._id} className="border p-4 mb-3">
          <h3 className="font-semibold">{job.title}</h3>

          <Link
            to={`/recruiter/jobs/${job._id}/applicants`}
            className="text-blue-600"
          >
            View Applicants
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MyJobs;
