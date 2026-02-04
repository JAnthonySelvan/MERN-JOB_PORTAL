import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers,fetchRecruiters,updateRecruiterStatus } from "../../features/admin/AdminSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { users, recruiters, loading,error } = useSelector((state) => state.admin);
  console.log(users)
  console.log(recruiters)

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchRecruiters());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Users */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Users</h2>
        <ul className="bg-white dark:bg-gray-800 rounded shadow">
          {users.map((u) => (
            <li key={u._id} className="p-3 border-b dark:border-gray-700">
              {u.name} — {u.email}
            </li>
          ))}
        </ul>
      </div>

      {/* Recruiters */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Recruiters</h2>
        <ul className="bg-white dark:bg-gray-800 rounded shadow">
          {recruiters.map((r) => (
            <div
              key={r._id}
              className="flex justify-between items-center p-3 border-b"
            >
              <div>
                <p>{r.name}</p>
                <p className="text-sm text-gray-500">
                  {r.email} — {r.status}
                </p>
              </div>

              {r.status === "pending" && (
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      dispatch(
                        updateRecruiterStatus({
                          id: r._id,
                          status: "approved",
                        }),
                        (window.location.href = "/admin/dashboard"),
                      )
                    }
                    className="bg-green-600 text-white px-2 py-1 rounded"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      dispatch(
                        updateRecruiterStatus({
                          id: r._id,
                          status: "rejected",
                        }),
                      )
                    }
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
