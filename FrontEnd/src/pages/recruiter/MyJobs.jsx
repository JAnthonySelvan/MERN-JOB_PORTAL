import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyJobs } from "../../features/job/jobSlice";
import { Link } from "react-router-dom";
import RecruiterJobCard from "../../components/RecruiterJobCard";

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
        <RecruiterJobCard job={job} />
      ))}
    </div>
  );
};

export default MyJobs;
