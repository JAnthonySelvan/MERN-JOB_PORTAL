import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers,fetchRecruiters } from "../../features/admin/AdminSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { users, recruiters, loading } = useSelector((state) => state.admin);
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
            <li key={r._id} className="p-3 border-b dark:border-gray-700">
              {r.name} — {r.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
