import axios from "axios";
import React, { useState } from "react";
import useSecureAxios from "../hooks/useSecureAxios";

const AllBlogSorting = ({ setBlogs, setLoading, setError, setIsNoData }) => {
  const [category, setCategory] = useState("");
  const axiosInstance = useSecureAxios();

  // * search by category
  const handleCategoryChange = async (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    if (!selectedCategory) {
      // If no category is selected, fetch all data
      try {
        const response = await axiosInstance.get("/all_blogs");
        if (response.data) {
          setBlogs(response.data);
        } else {
          console.warn("No data found:", response.data);
          // setError("No data found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // setError("Error fetching data");
      } finally {
        setLoading(false);
      }
      return;
    }

    // Fetch data for the selected category
    try {
      const response = await axiosInstance.get("/all_blogs", {
        params: { selectedCategory },
      });

      if (response.data) {
        setBlogs(response.data);
      } else {
        console.warn("No data found for the selected category:", response.data);
        // setError("No data found for the selected category");
      }
    } catch (error) {
      console.error("Error fetching blogs by category:", error);
      // setError("Error fetching blogs by category");
    } finally {
      setLoading(false);
    }
  };

  // category search end

  // * search by text on title
  const handleTextSearch = async (e) => {
    const searchText = e.target.value;
    // console.log(searchText);
    if (!searchText) {
      // if no search text, fetch all data
      async function fetchAllData() {
        try {
          const response = await axiosInstance.get("/all_blogs");

          if (response.data) {
            setBlogs(response.data);
          } else {
            console.warn("No data found:", response.data);
            setError("No data found");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          setError("Error fetching data");
        } finally {
          setLoading(false);
        }
      }

      fetchAllData();
      return;
    }

    try {
      const response = await axios.get(
        `https://nextblog-phi-ten.vercel.app/all_blogs`,
        {
          params: { searchText },
        }
      );
      setBlogs(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-5 px-5 bg-gray-300 dark:bg-gray-800 rounded-xl flex items-center justify-between">
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
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Business">Business</option>
          <option value="Health">Health</option>
          {}
        </select>
      </div>
    </div>
  );
};

export default AllBlogSorting;
