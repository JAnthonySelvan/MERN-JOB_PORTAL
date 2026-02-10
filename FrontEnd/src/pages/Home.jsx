import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// NEW COMPONENTS
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

const Home = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <>
  
      <div
        className="min-h-[calc(100vh-80px)] flex items-center justify-center
                   bg-gray-50 dark:bg-slate-900
                   text-gray-900 dark:text-white"
      >
        <div className="text-center max-w-2xl px-4">
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Find Your Dream Job
          </h1>

         
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
            A modern job portal where job seekers apply easily, recruiters hire
            faster, and everything stays simple.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {!isAuthenticated && (
              <>
                <Link
                  to="/jobs"
                  className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Browse Jobs
                </Link>

                <Link
                  to="/register"
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700
                             text-gray-900 dark:text-white
                             rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  Get Started
                </Link>
              </>
            )}

            {isAuthenticated && user?.role === "user" && (
              <Link
                to="/jobs"
                className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                View Jobs
              </Link>
            )}

            {isAuthenticated && user?.role === "recruiter" && (
              <Link
                to="/recruiter/dashboard"
                className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Go to Dashboard
              </Link>
            )}

            {isAuthenticated && user?.role === "admin" && (
              <Link
                to="/admin/dashboard"
                className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>

      <About />
      <Contact />
  
      <ScrollToTop />
    </>
  );
};

export default Home;
