import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCards from "../components/BlogCards";
import AllBlogSorting from "../components/AllBlogSorting";
import Loading from "./Loading";
import useSecureAxios from "../hooks/useSecureAxios";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosInstance = useSecureAxios();

  useEffect(() => {
    async function fetchAllData() {
      try {
        const response = await axiosInstance.get("/all_blogs");

        if (response.data) {
          // console.log(response.data);
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
  }, []);

  //
  // console.log(blogs);
  // Loading state UI
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  // Error state UI
  // console.log(error);
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Error Page ...</p>
      </div>
    );
  }

  // success UI
  return (
    <div className="w-11/12 mx-auto mt-7">
      {/* sorting section */}
      <div className="shadow-lg rounded-xl">
        <AllBlogSorting
          blogs={blogs}
          setBlogs={setBlogs}
          setLoading={setLoading}
          setError={setError}
        ></AllBlogSorting>
      </div>

      <div className="my-8  grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {blogs?.map((blog, i) => (
          <BlogCards key={i} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;
