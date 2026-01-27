import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchApplicants,updateApplicationStatus } from "../../features/application/applicationSlice";

const JobApplicants = () => {
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((state) => state.application);

  

  const handleStatusUpdate = (applicationId, status) => {
    // console.log(applicationId)
    dispatch(updateApplicationStatus({ applicationId, status }));
  };
  useEffect(() => {
    dispatch(fetchApplicants(jobId));
  }, [dispatch, jobId, handleStatusUpdate]);

  return (
    <div className="p-6 grid lg:grid-cols-3 gap-3 md:grid-cols-2">
      <h2 className="text-xl font-bold mb-4 lg:col-span-3 md:col-span-2">
        Applicants
      </h2>

      {applicants.map((app) => (
        <div key={app._id} className="border p-3 mb-2 ">
          <p>{app.applicant.name}</p>
          <p>{app.applicant.email}</p>
          <p>Status: {app.status}</p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => handleStatusUpdate(app._id, "shortlisted")}
              disabled={app.status === "shortlisted"}
              className="px-3 py-1 bg-green-600 text-white rounded"
            >
              Shortlist
            </button>

            <button
              onClick={() => handleStatusUpdate(app._id, "rejected")}
              disabled={app.status === "rejected"}
              className="px-3 py-1 bg-red-600 text-white rounded"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobApplicants;
