const SearchBar = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search jobs by location..."
      className="w-full mb-4 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default SearchBar;
