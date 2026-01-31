import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../features/job/jobSlice";
import JobCard from "../components/JobCard";
import Loader from "../components/Loader";
import { getMyApplications } from "../features/application/applicationSlice";

/* 🔹 Utility: build query safely */
const buildQuery = ({ page, keyword, location }) => {
  let query = `?page=${page}`;

  if (keyword && keyword.trim() !== "") {
    query += `&keyword=${encodeURIComponent(keyword.trim())}`;
  }

  if (location && location.trim() !== "") {
    query += `&location=${encodeURIComponent(location.trim())}`;
  }

  return query;
};

function Jobs() {
  const dispatch = useDispatch();

  const { jobs, loading, error, isSearching, pages } = useSelector(
    (state) => state.jobs,
  );
  useEffect(()=>{
    dispatch(getMyApplications())
  },[])
  /* 🔹 Local UI state */
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  /* 🔹 Initial load */
  useEffect(() => {
    const query = buildQuery({
      page: currentPage,
      keyword,
      location,
    });
    dispatch(fetchJobs(query));
  }, [dispatch, currentPage]);

  /* 🔍 Search submit */
  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      setCurrentPage(1);

      const query = buildQuery({
        page: 1,
        keyword,
        location,
      });

      dispatch(fetchJobs(query));
    },
    [dispatch, keyword, location],
  );

  /* 📄 Pagination */
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);

    const query = buildQuery({
      page: pageNumber,
      keyword,
      location,
    });

    dispatch(fetchJobs(query));
  };

  /* ⏳ Page loader */
  if (loading && !isSearching) return <Loader />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 relative">
      {/* 🔹 Page Title */}
      <h1 className="text-2xl font-bold mb-6">Find Jobs</h1>

      {/* 🔍 Search + Location Filter */}
      <form
        onSubmit={handleSearch}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
      >
        <input
          type="text"
          placeholder="Search by job title"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="p-2 border rounded dark:bg-gray-800"
        />

        <input
          type="text"
          placeholder="Location (e.g. Chennai)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="p-2 border rounded dark:bg-gray-800"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2"
        >
          Search
        </button>
      </form>

      {/* 🔄 Background searching indicator */}
      {isSearching && (
        <p className="text-xs text-gray-400 absolute top-4 right-6">
          Updating…
        </p>
      )}

      {/* ❌ Error */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* 📋 Jobs List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {jobs.length === 0 && !loading && (
          <p className="text-gray-500 col-span-full">No jobs found</p>
        )}

        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>

      {/* 📄 Pagination */}
      {pages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(pages).keys()].map((x) => (
            <button
              key={x + 1}
              onClick={() => handlePageChange(x + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === x + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              {x + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Jobs;
