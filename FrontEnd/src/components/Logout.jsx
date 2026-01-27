import React from 'react'
import { useDispatch } from "react-redux";
import { logoutUser } from '../features/auth/authSlice';
function Logout() {
    const dispatch = useDispatch();
  return (
    <button
      onClick={() => dispatch(logoutUser())}
      className="px-4 py-2 bg-red-500 text-white rounded"
    >
      Logout
    </button>
  );
}

export default Logout