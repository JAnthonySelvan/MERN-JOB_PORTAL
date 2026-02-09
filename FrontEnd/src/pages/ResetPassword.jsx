import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/axios";
import PasswordInput from "../components/PasswordInput";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      return setMessage("Password must be at least 6 characters");
    }

    setLoading(true);

    try {
      await api.post(`/auth/reset-password/${token}`, { password });
      navigate("/login");
    } catch (err) {
      setMessage("Reset link is invalid or expired");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={submitHandler}
        className="p-6 w-80 rounded bg-white dark:bg-gray-800 shadow"
      >
        <h2 className="text-xl font-bold mb-4 text-black dark:text-white">
          Reset Password
        </h2>

        <PasswordInput
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
        />

        {message && (
          <p className="text-red-500 dark:text-red-400 text-sm mb-2">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="
            w-full bg-blue-600 hover:bg-blue-700
            text-white py-2 rounded
            disabled:opacity-50
          "
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
