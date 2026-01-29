import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import ThemeToggle from "./themeToggle";
import { useState } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const linkClass = ({ isActive }) =>
    isActive
      ? "font-bold text-blue-600 dark:text-blue-400"
      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white";


  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
    setOpen(false);
  };

  return (
    <nav className="w-[98vw] mx-auto h-12 bg-white dark:bg-slate-900 text-gray-800 dark:text-white shadow">
      {/* TOP BAR */}
      <div className="flex items-center">
        {/* Logo */}
        <Link to="/" className="text-xl dark:text-white font-bold text-black">
          JobPortal
        </Link>

        {/* DESKTOP LINKS */}
        <div className="ml-auto hidden md:flex items-center gap-6">
          {isAuthenticated && user?.role === "user" && (
            <>
              <NavLink to="/profile" className={linkClass}>
                Profile
              </NavLink>
              <NavLink to="/jobs" className={linkClass}>
                Jobs
              </NavLink>
            </>
          )}

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

          <ThemeToggle />

          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 mt-1 py-1 rounded text-white"
            >
              Logout
            </button>
          )}
        </div>

        {/* HAMBURGER (MOBILE ONLY) */}
        <button
          className="ml-auto md:hidden text-2xl text-white"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="mt-4 flex flex-col items-end gap-4 md:hidden">
          {isAuthenticated && user?.role === "user" && (
            <>
              <NavLink
                to="/profile"
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                Profile
              </NavLink>
              <NavLink
                to="/jobs"
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                Jobs
              </NavLink>
            </>
          )}

          {isAuthenticated && user?.role === "recruiter" && (
            <>
              <NavLink
                to="/recruiter/dashboard"
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/recruiter/jobs"
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                My Jobs
              </NavLink>
            </>
          )}

          <ThemeToggle />

          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-1 rounded text-white"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
