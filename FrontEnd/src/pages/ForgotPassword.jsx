import { useState } from "react";
import api from "../services/axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [send,setSend] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault();
    await api.post("/auth/forgot-password", { email });
    setMsg("If email exists, reset link has been sent");
    setSend(true)

  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={submitHandler}
        className="max-w-sm w-full p-6 rounded bg-white dark:bg-gray-800 shadow"
      >
        <h2 className="text-xl font-bold mb-4 text-black dark:text-white">
          Forgot Password
        </h2>

        <input
          type="email"
          placeholder="Enter email"
          className="
            w-full p-2 border rounded mb-3
            bg-white text-black
            dark:bg-gray-700 dark:text-white dark:border-gray-600
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded" disabled={send}>
          Send Reset Link
        </button>

        {msg && (
          <p className="text-green-600 dark:text-green-400 mt-3 text-sm">
            {msg}
          </p>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
