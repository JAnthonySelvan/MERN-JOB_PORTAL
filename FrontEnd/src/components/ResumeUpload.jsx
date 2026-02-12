import React, { useState } from "react";
import api from "../services/axios";
import { useDispatch } from "react-redux";
import { getMe } from "../features/auth/authSlice";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

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

      await dispatch(getMe());
      setFile(null);
      setPreview(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div className="border-2 border-dashed rounded-lg p-4 text-center dark:border-gray-600">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full text-sm"
        />
      </div>

      {preview && (
        <div className="mt-4">
          <p className="text-sm mb-2 text-gray-500">Preview:</p>
          <img
            src={preview}
            alt="Preview"
            className="w-full rounded-lg shadow"
          />
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
      >
        {loading ? "Uploading..." : "Upload Resume"}
      </button>
    </form>
  );
}

export default ResumeUpload;
