import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyApplications,
  respondInterview,
} from "../features/application/applicationSlice";
import Loader from "../components/Loader";

const statusColor = {
  pending: "text-yellow-500",
  shortlisted: "text-green-600",
  rejected: "text-red-500",
};

const interviewStatusColor = {
  scheduled: "text-blue-500",
  accepted: "text-green-600",
  rejected: "text-red-500",
};

const MyApplications = () => {
  const dispatch = useDispatch();

  const { myApplications, loading, error } = useSelector(
    (state) => state.application,
  );

  useEffect(() => {
    dispatch(getMyApplications());
  }, [dispatch]);

  const handleRespond = async (applicationId, status) => {
    await dispatch(
      respondInterview({
        applicationId,
        status,
      }),
    );

    dispatch(getMyApplications()); // refresh AFTER update
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Applications</h1>

      {myApplications.length === 0 ? (
        <p className="text-gray-500">You haven’t applied for any jobs yet.</p>
      ) : (
        <div className="space-y-4">
          {myApplications.map((app) => {
            const jobRemoved = app.jobDeleted === true;

            return (
              <div
                key={app._id}
                className="p-4 border rounded bg-white dark:bg-gray-800 shadow"
              >
  
                {jobRemoved ? (
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300 rounded">
                    This job has been removed by the recruiter.
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold">{app.job?.title}</h3>

                    <p className="text-sm text-gray-500">
                      Location: {app.job?.location}
                    </p>
                  </>
                )}

                <p className="mt-2">
                  Application Status:{" "}
                  <span className={`font-semibold ${statusColor[app.status]}`}>
                    {app.status}
                  </span>
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Applied on: {new Date(app.createdAt).toLocaleDateString()}
                </p>

             
                {!jobRemoved && app.interview && (
                  <div className="mt-4 p-3 border rounded bg-gray-50 dark:bg-gray-700">
                    <h4 className="font-semibold mb-1">Interview Details</h4>

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

                    <p className="mt-2">
                      Interview Status:{" "}
                      <span
                        className={`font-semibold ${
                          interviewStatusColor[app.interview.status]
                        }`}
                      >
                        {app.interview.status}
                      </span>
                    </p>

                    {app.interview.status === "scheduled" && (
                      <div className="flex gap-3 mt-3">
                        <button
                          onClick={() => handleRespond(app._id, "accepted")}
                          className="bg-green-600 text-white px-3 py-1 rounded"
                        >
                          Accept
                        </button>

                        <button
                          onClick={() => handleRespond(app._id, "rejected")}
                          className="bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                )}
              
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyApplications;
