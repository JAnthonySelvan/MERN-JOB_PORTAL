import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { registerUser } from "../features/auth/authSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!error && !loading) {
        navigate("/login")
    }
  }, [error, loading, navigate]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        className="p-6 w-96 rounded bg-white dark:bg-gray-800 shadow"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <input
          className="w-full mb-2 p-2 border rounded dark:bg-gray-700"
          type="text"
          placeholder="name"
          {...register("name", { required: "Name is REquired!" })}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
        <input
          className="w-full mb-2 p-2 border rounded dark:bg-gray-700"
          type="email"
          {...register("email", { required: "email is required!" })}
          placeholder="email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
        <input
          className="w-full mb-2 p-2 border rounded dark:bg-gray-700"
          type="password"
          placeholder="password"
          {...register("password", { required: "Password is required!" })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
        <select
          className="w-full mb-4 p-2 border rounded dark:bg-gray-700"
          {...register("role", { required: "Role is required!" })}
        >
          <option value=""> Select role</option>
          <option value="user">User</option>
          <option value="recruiter">Recruiter</option>
        </select>
        {errors.role && (
          <p className="text-red-500 text-sm">{errors.role.message}</p>
        )}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          className="w-full bg-green-600 text-white py-2 rounded"
          type="submit"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Register;
