import axios from "axios";
import React, { useEffect, useState } from "react";

const AllBlogSorting = ({ blogs, setBlogs }) => {
  // console.log(blogs);
  // console.log(setBlogs);
  // const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  //
  //
  //

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    console.log(category);

    // Using useEffect to fetch data when component is mounted

    // Exit if userMail is not provided
    if (!category) {
      setError("Category is required to fetch blogs.");
      return;
    }

    const fetchReviews = async () => {
      setLoading(true);
      setError(null);

      try {
        // Replace with your environment variable for the API URL
        const response = await axios.get(
          `http://localhost:5001//all_blogs`,
          category
        );

        if (response.data.success) {
          setBlogs(response.data);
          console.log(response.data);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        // Handle network or server errors
        console.error("Error fetching reviews:", error);
        setError("An error occurred while fetching reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  };
  // console.log(object)
  //
  //
  //
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="py-5 px-5 bg-gray-300 rounded-xl flex items-center justify-between">
      <div className="w-1/3">
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Search" />
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
          defaultValue="All Category"
          className="select select-bordered w-full max-w-xs"
          onChange={handleCategoryChange}
        >
          <option>All Category</option>
          <option>Han Solo</option>
          <option>Greedo</option>
        </select>
      </div>
    </div>
  );
};

export default AllBlogSorting;
