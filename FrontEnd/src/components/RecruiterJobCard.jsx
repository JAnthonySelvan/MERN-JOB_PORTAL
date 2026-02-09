import { useDispatch } from "react-redux";
import { deleteJob } from "../features/job/jobSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import Swal from "sweetalert2"


const RecruiterJobCard = ({ job }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mode = useSelector((state)=>state.theme.mode)
  // console.log(typeof(mode))

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      theme:mode
      
    }).then((result) => {
      if (result.isConfirmed) {
        
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          
          
        }
    );
    dispatch(deleteJob(job._id));
    window.location.href = "/recruiter/jobs";
      }
      
    });
  };

  return (
    <div className="border p-4 rounded bg-white dark:bg-gray-800 mb-4">
      <h3 className="font-semibold">{job.title}</h3>
      <p className="text-sm text-gray-500">{job.location}</p>

      <Link
        to={`/recruiter/jobs/${job._id}/applicants`}
        className="text-blue-600"
      >
        View Applicants
      </Link>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => navigate(`/recruiter/edit-job/${job._id}`)}
          className="px-3 py-1 bg-yellow-500 text-white rounded"
        >
          <FaEdit/>
        </button>

        <button
          onClick={handleDelete}
          className="px-3 py-1 bg-red-600 text-white rounded"
        >
          <AiFillDelete/>
        </button>
      </div>
    </div>
  );
};

export default RecruiterJobCard;
