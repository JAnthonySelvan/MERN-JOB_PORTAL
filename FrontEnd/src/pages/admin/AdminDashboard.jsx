import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  fetchRecruiters,
  updateRecruiterStatus,
  fetchAnalytics,
} from "../../features/admin/AdminSlice";

const StatCard = ({ title, value }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded shadow text-center">
    <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
    <p className="text-2xl font-bold mt-2">{value ?? 0}</p>
  </div>
);

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const { users, recruiters, analytics, loading, error } = useSelector(
    (state) => state.admin,
  );

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchRecruiters());
    dispatch(fetchAnalytics());
  }, [dispatch]);

  const handleStatusUpdate = (id, status) => {
    dispatch(updateRecruiterStatus({ id, status }));
    dispatch(fetchRecruiters())
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Users" value={analytics?.totalUsers} />
        <StatCard title="Total Recruiters" value={analytics?.totalRecruiters} />
        <StatCard title="Total Jobs" value={analytics?.totalJobs} />
        <StatCard title="Applications" value={analytics?.totalApplications} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Users</h2>
        <ul className="bg-white dark:bg-gray-800 rounded shadow divide-y dark:divide-gray-700">
          {users.map((u) => (
            <li key={u._id} className="p-3">
              {u.name} — {u.email}
            </li>
          ))}
        </ul>
      </div>

      {/* 🧑‍💼 Recruiters */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Recruiters</h2>
        <ul className="bg-white dark:bg-gray-800 rounded shadow divide-y dark:divide-gray-700">
          {recruiters.map((r) => (
            <li key={r._id} className="flex justify-between items-center p-3">
              <div>
                <p className="font-medium">{r.name}</p>
                <p className="text-sm text-gray-500">
                  {r.email} — {r.status}
                </p>
              </div>

              {r.status === "pending" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStatusUpdate(r._id, "approved")}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleStatusUpdate(r._id, "rejected")}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
