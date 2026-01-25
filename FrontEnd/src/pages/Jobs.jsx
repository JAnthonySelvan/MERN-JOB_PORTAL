import React, { useEffect, useState,useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchJobs } from "../features/job/jobSlice";
import JobCard from "../components/JobCard";
import JobSearch from "../components/JobSearch";

function Jobs() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.jobs);
  const { jobs, loading, error ,isSearching} = state;
//   console.log(jobs)
  const [keyword, setKeyword] = useState("");

    useEffect(()=>{
        dispatch(fetchJobs())
    },[])

  const handleSearch = useCallback(
    (keyword) => {
      dispatch(fetchJobs(`?keyword=${keyword}`));
    },
    [dispatch],
  );
//   if (loading) return <p className="p-4">Loading jobs...</p>;
//   if (error) return <p className="p-4 text-red-500">{error}</p>;
  return (
    <div className="p-6">
      <JobSearch onSearch={handleSearch} />
      {loading && <p className="p-4">Loading jobs...</p>}
      {isSearching && (
        <p className="text-xs text-gray-400 absolute top-0 right-0">
          Updating…
        </p>
      )}
      {error && <p className="text-red-500">{error}</p>}
      <div className="p-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <JobCard key={jobs._id} job={job} />
        ))}
      </div>
    </div>
  );
}

export default Jobs;
