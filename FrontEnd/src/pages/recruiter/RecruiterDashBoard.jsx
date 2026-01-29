import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logout from "../../components/Logout";
import Container from "../../components/Container";
function RecruiterDashBoard() {
  const { name, email, role } = useSelector((state) => state.auth.user);
  return (
    <Container>
      <div className="flex justify-center mt-16">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">
            RecruiterDashBoard
          </h2>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Name</span>
              <span className="font-medium">{name}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Email</span>
              <span className="font-medium">{email}</span>
            </div>

            <div className="flex justify-between ">
              <span className="text-gray-500">Role</span>
              <span className="font-medium capitalize">{role}</span>
            </div>
          </div>
          <div className="my-6 flex items-stretch justify-evenly">
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
    </Container>
  );
}

export default RecruiterDashBoard;
