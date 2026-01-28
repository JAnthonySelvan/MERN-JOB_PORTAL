import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import ThemeToggle from "./themeToggle";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const linkClass = ({ isActive }) =>
    isActive ? "font-bold text-blue-600" : "text-gray-600 dark:text-gray-300";

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-900 shadow">
      {/*  Logo */}
      <Link to="/" className="text-xl font-bold">
        JobPortal
      </Link>

      {/*  Links */}
      <div className="flex items-center gap-6">
        {/* Public */}

        {!isAuthenticated && (
          <>
            <NavLink to="/login" className={linkClass}>
              Login
            </NavLink>
            <NavLink to="/register" className={linkClass}>
              Register
            </NavLink>
          </>
        )}

        {/* User */}
        {isAuthenticated && user?.role === "user" && (
          <>
            <NavLink to="/user/dashboard" className={linkClass}>
              Profile
            </NavLink>
            <NavLink to="/jobs" className={linkClass}>
              Jobs
            </NavLink>
          </>
        )}

        {/* Recruiter */}
        {isAuthenticated && user?.role === "recruiter" && (
          <>
            <NavLink to="/recruiter/dashboard" className={linkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/recruiter/jobs" className={linkClass}>
              My Jobs
            </NavLink>
          </>
        )}

        {/* 🌙 Dark Mode Toggle (isolated component) */}
        <ThemeToggle />

        {/* 🚪 Logout */}
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
