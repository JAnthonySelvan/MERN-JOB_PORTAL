import { useState } from "react";
import api from "../services/axios";
import { useDispatch } from "react-redux";
import { getMe } from "../features/auth/authSlice";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);

      await api.patch("/user/upload-resume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(getMe());
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3">
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="block w-full text-sm"
      />

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {loading ? "Uploading..." : "Upload Resume"}
      </button>
    </form>
  );
}

export default ResumeUpload;
