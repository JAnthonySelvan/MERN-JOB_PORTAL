import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import api from "../services/axios";

function Login() {
  const dispatch = useDispatch();
  
  const { loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: null,
    password: null,
  });
  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  };
  const handleSubmit = (e)=>{
    e.preventDefault()
    // console.log(formData)
    dispatch(loginUser(formData))
  }

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
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          className="w-full mb-3 p-2 border rounded dark:bg-gray-700"
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="password"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button type="submit" disabled={loading} className="w-full bg-blue-600 py-2 rounded">
          {loading ? "Loging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
