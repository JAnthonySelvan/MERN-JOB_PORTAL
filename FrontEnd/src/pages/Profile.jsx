import { useEffect } from "react";
import { getMe } from "../features/auth/authSlice";
import ResumeUpload from "../components/ResumeUpload";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";

const Profile = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { name, email, role, resume } = user;

  useEffect(() => {
    navigate("/profile");
  }, []);

  return (
    <Container>
      <div className="flex justify-center mt-16">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Name</span>
              <span className="font-medium">{user.name}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Email</span>
              <span className="font-medium">{user.email}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Role</span>
              <span className="font-medium capitalize">{user.role}</span>
            </div>
          </div>

          {user.resume ? (
            <a
              href={` http://localhost:5000${user.resume}`}
              target="_blank"
              rel="noreferrer"
              className=" ml-7 text-blue-600 block mt-2"
            >
              View Resume
            </a>
          ) : (
            <ResumeUpload />
          )}
        </div>
      </div>
    </Container>
  );
};

export default Profile;
