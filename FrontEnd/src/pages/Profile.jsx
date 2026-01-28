import ResumeUpload from "../components/ResumeUpload";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const {name,email,role,resume}= user

  return (
    <div className="h-[50vh] flex justify-center items-center">
      <div className="rounded shadow-md p-6 dark:bg-gray-800">
        <h1 className="text-2xl font-bold mb-4">Recruiter Dashboard</h1>
        <p className="mx-5 mb-4">Name  : {name}</p>
        <p className="mx-5 mb-4">email : {email}</p>
        <p className="mx-5 mb-4">Role  : {role}</p>
      {user.resume && (
        <a 
          href ={` http://localhost:5000${user.resume}` }

           target="_blank"

          rel="noreferrer"
          className=" ml-7 text-blue-600 block mt-2"
        >
          View Resume
        </a>
      )}
      {!user.resume && <ResumeUpload />}
    </div>
    </div>
  );
};

export default Profile