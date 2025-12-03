import { useState } from "react";
import { FiSearch, FiFilter, FiRefreshCw } from "react-icons/fi";

export default function AdvancedFilter({ onFilterChange }) {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [sort, setSort] = useState("");
  const [year, setYear] = useState("");

  const handleApply = () => {
    onFilterChange({ search, genre, sort, year });
  };

  const resetFilters = () => {
    setSearch("");
    setGenre("");
    setSort("");
    setYear("");
    onFilterChange({ search: "", genre: "", sort: "", year: "" });
  };

  return (
    <div className="w-full bg-gray-900 text-white p-4 rounded-xl shadow-lg flex flex-col gap-4">

      {/* Search */}
      <div className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg">
        <FiSearch className="text-gray-400" />
        <input
          type="text"
          className="bg-transparent w-full outline-none"
          placeholder="Search anime..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filters Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {/* Genre */}
        <div className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg">
          <FiFilter className="text-gray-400" />
          <select
            className="bg-transparent w-full outline-none"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="">Genre</option>
            <option value="Action">Action</option>
            <option value="Romance">Romance</option>
            <option value="Comedy">Comedy</option>
            <option value="Fantasy">Fantasy</option>
          </select>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg">
          <FiFilter className="text-gray-400" />
          <select
            className="bg-transparent w-full outline-none"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="rating">Top Rating</option>
            <option value="recent">Recently Added</option>
            <option value="alphabet">A-Z</option>
          </select>
        </div>

        {/* Year */}
        <input
          type="number"
          placeholder="Year"
          min="1980"
          max="2030"
          className="bg-gray-800 px-3 py-2 rounded-lg outline-none"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        {/* Reset Button */}
        <button
          className="bg-red-600 hover:bg-red-700 transition px-3 py-2 rounded-lg flex items-center justify-center gap-2"
          onClick={resetFilters}
        >
          <FiRefreshCw /> Reset
        </button>
      </div>

      {/* Apply Button */}
      <button
        onClick={handleApply}
        className="bg-blue-600 hover:bg-blue-700 transition w-full py-2 rounded-lg"
      >
        Apply Filters
      </button>
    </div>
  );
}
