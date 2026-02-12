import { useSelector } from "react-redux";
import ResumeUpload from "../components/ResumeUpload";
import Container from "../components/Container";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return null;

  return (
    <Container>
      <div className="flex justify-center mt-16">
        <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition">
          <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>

          {/* User Info */}
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

          {/* Resume Section */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-3">Resume</h3>

            {user.resume ? (
              <div className="space-y-4">
                <img
                  src={user.resume}
                  alt="Resume"
                  className="w-full rounded-xl shadow"
                />

                <ResumeUpload />
              </div>
            ) : (
              <ResumeUpload />
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
