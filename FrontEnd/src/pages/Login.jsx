import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../components/Loader";
import PasswordInput from "../components/PasswordInput";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loginUser(formData));
  };

  
  useEffect(() => {
    if (user) {
      if (user.role === "user") {
        navigate("/profile");
      } else if (user.role === "recruiter") {
        navigate("/recruiter/dashboard");
      }
      else if(user.role === "admin"){
        navigate("/admin/dashboard")
      }
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="p-6 w-80 rounded bg-white dark:bg-gray-800 shadow"
      >
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
          className="w-full mb-3 p-2 border rounded dark:bg-gray-700"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />

        {/* <input
          className="w-full mb-3 p-2 border rounded dark:bg-gray-700"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        /> */}

        <PasswordInput
          value={formData.password}
          name="password"
          onChange={handleChange}
          placeholder="Password"
        />

        <div className="text-right mb-3">
          <Link
            to="/forgot-password"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {error && (
          <p className="text-red-500">
            {typeof error === "string" ? error : error.message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded mb-4"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* {loading && <Loader />} */}

        <p className="text-center">
          If you don't have an account{" "}
          <Link className="text-red-600" to="/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
