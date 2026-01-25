import { useEffect, useRef, useState } from "react";

const JobSearch = ({ onSearch }) => {
  const [value, setValue] = useState("");
  const lastSearched = useRef("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (value !== lastSearched.current) {
        onSearch(value);
        lastSearched.current = value;
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [value, onSearch]);

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Search jobs..."
      className="mb-4 p-2 border rounded w-full dark:bg-gray-700"
    />
  );
};

export default JobSearch;
