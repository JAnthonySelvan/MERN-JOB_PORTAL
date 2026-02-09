import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchApplicants,
  updateApplicationStatus,
  cancelInterview,
} from "../../features/application/applicationSlice";
import ScheduleInterview from "./ScheduleInterview";

const JobApplicants = () => {
  const { jobId } = useParams();
  const dispatch = useDispatch();

  const { applicants } = useSelector((state) => state.application);
  const [editId, setEditId] = useState(null);

  const handleStatusUpdate = async (applicationId, status) => {
    await dispatch(updateApplicationStatus({ applicationId, status }));
    dispatch(fetchApplicants(jobId));
  };

  const handleCancel = async (applicationId) => {
    await dispatch(cancelInterview(applicationId));
    setEditId(null);
    dispatch(fetchApplicants(jobId));
  };

  useEffect(() => {
    dispatch(fetchApplicants(jobId));
  }, [dispatch, jobId]);

  return (
    <div className="p-6 grid lg:grid-cols-3 md:grid-cols-2 gap-3">
      <h2 className="text-xl font-bold mb-4 lg:col-span-3 md:col-span-2">
        Applicants
      </h2>

      {applicants.map((app) => {
        const interviewAccepted = app.interview?.status === "accepted";
        const interviewScheduled = app.interview?.status === "scheduled";

        return (
          <div
            key={app._id}
            className="flex flex-col items-center border rounded-md p-3 dark:border-gray-700"
          >
            <p className="font-semibold">{app.applicant.name}</p>
            <p className="text-sm">{app.applicant.email}</p>
            <p>Status: {app.status}</p>

            {app.applicant.resume && (
              <a
                href={`http://localhost:5000${app.applicant.resume}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 mt-2"
              >
                View Resume
              </a>
            )}

            {/* Shortlist / Reject */}
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleStatusUpdate(app._id, "shortlisted")}
                disabled={app.status === "shortlisted" || interviewAccepted}
                className="px-3 py-1 bg-green-600 text-white rounded disabled:opacity-50"
              >
                Shortlist
              </button>

              <button
                onClick={() => handleStatusUpdate(app._id, "rejected")}
                disabled={interviewAccepted || app.interview}
                className="px-3 py-1 bg-red-600 text-white rounded disabled:opacity-50"
              >
                Reject
              </button>
            </div>

            {/* Schedule */}
            {app.status === "shortlisted" && !app.interview && (
              <ScheduleInterview applicationId={app._id} jobId={jobId} />
            )}

            {/* Interview section */}
            {app.interview && (
              <div className="mt-2 text-sm text-center w-full">
                <p>
                  Interview:{" "}
                  <span className="font-semibold">{app.interview.status}</span>
                </p>

                {interviewScheduled && (
                  <div className="flex gap-2 mt-2 justify-center">
                    <button
                      onClick={() => setEditId(app._id)}
                      className="px-2 py-1 bg-yellow-500 text-white rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleCancel(app._id)}
                      className="px-2 py-1 bg-red-600 text-white rounded"
                    >
                      Cancel
                    </button>
                  </div>
                )}

                {editId === app._id && interviewScheduled && (
                  <ScheduleInterview
                    applicationId={app._id}
                    jobId={jobId}
                    interview={app.interview}
                    isEdit
                    onClose={() => setEditId(null)}
                  />
                )}

                {app.interview.status === "accepted" && (
                  <div>
                    <p>
                      Mode:{" "}
                      <span className="font-medium">{app.interview.mode}</span>
                    </p>

                    <p>Date: {new Date(app.interview.date).toDateString()}</p>

                    <p>Time: {app.interview.time}</p>

                    {app.interview.mode === "online" && (
                      <a
                        href={app.interview.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline"
                      >
                        Join Meeting
                      </a>
                    )}

                    {app.interview.mode === "offline" && (
                      <p>Location: {app.interview.location}</p>
                    )}

                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default JobApplicants;
