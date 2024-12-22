import axios from "axios";
import React, { useState } from "react";

const AllBlogSorting = ({ setBlogs, setLoading, setError }) => {
  const [category, setCategory] = useState("");

  // category sorting function
  const handleCategoryChange = async (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    if (!selectedCategory) {
      setError("Category is required to fetch blogs.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5001/all_blogs`, {
        params: { selectedCategory },
      });
      setBlogs(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  // text searching function
  const handleTextSearch = async (e) => {
    const searchText = e.target.value;
    // console.log(searchText);
    if (!searchText) {
      setError("Search text is required to fetch blogs.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5001/all_blogs`, {
        params: { searchText },
      });
      setBlogs(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-5 px-5 bg-gray-300 rounded-xl flex items-center justify-between">
      <div className="w-1/3">
        <label className="input input-bordered flex items-center gap-2">
          <input
            onChange={handleTextSearch}
            type="text"
            className="grow"
            placeholder="Search"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>

      <div className="w-1/4">
        <select
          onChange={handleCategoryChange}
          className="select select-bordered w-full max-w-xs"
          value={category}
        >
          <option value="">All</option>
          <option value="Travel">Travel</option>
          <option value="Health">Health</option>
        </select>
      </div>
    </div>
  );
};

export default AllBlogSorting;
