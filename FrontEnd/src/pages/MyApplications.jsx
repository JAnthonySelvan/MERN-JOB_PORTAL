import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyApplications } from "../features/application/applicationSlice";
import Loader from "../components/Loader"


const statusColor = {
  pending: "text-yellow-500",
  shortlisted: "text-green-600",
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

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Applications</h1>

      {myApplications.length === 0 ? (
        <p className="text-gray-500">You haven’t applied for any jobs yet.</p>
      ) : (
        <div className="space-y-4">
          {myApplications.map((app) => (
            <div
              key={app._id}
              className="p-4 border rounded bg-white dark:bg-gray-800 shadow"
            >
              <h3 className="text-lg font-semibold">{app.job?.title}</h3>

              <p className="text-sm text-gray-500">
                Location: {app.job?.location}
              </p>

              <p className="mt-2">
                Status:{" "}
                <span className={`font-semibold ${statusColor[app.status]}`}>
                  {app.status}
                </span>
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Applied on: {new Date(app.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;
