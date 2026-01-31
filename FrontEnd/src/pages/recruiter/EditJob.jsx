import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateJob } from "../../features/job/jobSlice";


import { useParams, useNavigate } from "react-router-dom";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const job = useSelector((state) => state.jobs.jobs.find((j) => j._id === id));

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
  });

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title,
        description: job.description,
        location: job.location,
      });
    }
  }, [job]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(updateJob({ id, data: formData }));

    if (updateJob.fulfilled.match(result)) {
      navigate("/recruiter/jobs");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Edit Job
        </h2>

        {/* Job Title */}
        <input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Job Title"
          className="w-full p-2 border rounded
                     bg-white dark:bg-gray-700
                     text-gray-800 dark:text-white
                     border-gray-300 dark:border-gray-600
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Description */}
        <textarea
          rows="4"
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value,
            })
          }
          placeholder="Job Description"
          className="w-full p-2 border rounded
                     bg-white dark:bg-gray-700
                     text-gray-800 dark:text-white
                     border-gray-300 dark:border-gray-600
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Location */}
        <input
          value={formData.location}
          onChange={(e) =>
            setFormData({
              ...formData,
              location: e.target.value,
            })
          }
          placeholder="Location"
          className="w-full p-2 border rounded
                     bg-white dark:bg-gray-700
                     text-gray-800 dark:text-white
                     border-gray-300 dark:border-gray-600
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700
                     text-white font-semibold py-2 rounded transition"
        >
          Update Job
        </button>
      </form>
    </div>
  );
};

export default EditJob;
