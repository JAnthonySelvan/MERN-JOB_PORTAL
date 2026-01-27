import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logout from "../../components/Logout";
function RecruiterDashBoard() {
  const { name, email, role } = useSelector((state) => state.auth.user);
  return (
    <div className="h-[50vh] flex justify-center items-center">
      <div className="rounded shadow-md p-6 dark:bg-gray-800">
        <h1 className="text-2xl font-bold mb-4">Recruiter Dashboard</h1>
        <p className="mx-5 mb-4">Name  : {name}</p>
        <p className="mx-5 mb-4">email : {email}</p>
        <p className="mx-5 mb-4">Role  : {role}</p>
        <div className=" mb-4">
          <Link
            to="/recruiter/jobs"
            className="ml-2 py-2 p-3 mr-3 bg-blue-600 text-white rounded"
          >
            View My Jobs
          </Link>
          <Logout />
        </div>
      </div>
    </div>
  );
}

export default RecruiterDashBoard;
