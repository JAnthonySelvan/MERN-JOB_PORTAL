import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import ThemeToggle from "./themeToggle";
import { useState, useRef, useEffect } from "react";

/* Utils */
const getInitials = (name = "") =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileButtonRef = useRef(null);
  const dropdownRef = useRef(null);

  const linkClass = ({ isActive }) =>
    isActive
      ? "font-semibold text-blue-600 dark:text-blue-400"
      : "text-gray-700 dark:text-gray-300 hover:text-blue-600";

  const handleLogout = async () => {
    await dispatch(logoutUser());
    setProfileOpen(false);
    setMobileOpen(false);
    navigate("/login");
  };

  /* Close dropdown on outside click (SAFE) */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(e.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* ================= TOP NAV ================= */}
      <nav className="w-full h-14 px-4 flex items-center bg-white dark:bg-slate-900 shadow">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          JobPortal
        </Link>

        {/* ================= DESKTOP ================= */}
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

          {/* Profile Dropdown (Desktop) */}
          {isAuthenticated && (
            <div className="relative">
              <button
                ref={profileButtonRef}
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold"
              >
                {getInitials(user?.name)}
              </button>

              {profileOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded shadow"
                >
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ================= MOBILE BUTTON ================= */}
        <button
          className="ml-auto md:hidden text-2xl"
          onClick={() => setMobileOpen(true)}
        >
          ☰
        </button>
      </nav>

      {/* ================= MOBILE DRAWER ================= */}
      <div
        className={`fixed inset-0 z-50 flex transition-opacity duration-300 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          className="flex-1 bg-black/40"
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`w-72 bg-white dark:bg-slate-900 p-4 flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="text-xl font-bold mb-6">JobPortal</div>

          {/* Links */}
          <div className="flex flex-col gap-4 flex-1">
            {isAuthenticated && user?.role === "user" && (
              <>
                <NavLink to="/profile" onClick={() => setMobileOpen(false)}>
                  Profile
                </NavLink>
                <NavLink to="/jobs" onClick={() => setMobileOpen(false)}>
                  Jobs
                </NavLink>
              </>
            )}

            {isAuthenticated && user?.role === "recruiter" && (
              <>
                <NavLink
                  to="/recruiter/dashboard"
                  onClick={() => setMobileOpen(false)}
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/recruiter/jobs"
                  onClick={() => setMobileOpen(false)}
                >
                  My Jobs
                </NavLink>
              </>
            )}

            <ThemeToggle />
          </div>

          {/* Profile Section (Mobile) */}
          {isAuthenticated && (
            <div className="border-t pt-4">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                  {getInitials(user?.name)}
                </div>
                <span>{user?.name}</span>
              </button>

              {profileOpen && (
                <button onClick={handleLogout} className="mt-3 text-red-500">
                  Logout
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
