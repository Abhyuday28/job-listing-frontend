import { useEffect, useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const trimmed = value.trim();

    if (trimmed.length < 2) return;

    const id = setTimeout(() => {
      onSearch(trimmed);
    }, 500);

    return () => clearTimeout(id);
  }, [value, onSearch]);

  return (
    <input
      type="text"
      value={value}
      placeholder="Search jobs by location..."
      className="w-full mb-4 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default SearchBar;
