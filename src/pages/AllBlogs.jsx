import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCards from "../components/BlogCards";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //
  useEffect(() => {
    async function fetchAllData() {
      try {
        const response = await axios.get("http://localhost:5001/all_blogs");

        if (response.data) {
          // console.log("Fetched Data:", response.data);
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
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  // Error state UI
  if (error) {
    return <div>Error: {error}</div>;
  }

  // success UI
  return (
    <div className="w-11/12 mx-auto mt-7">
      <p>Total Blogs : {blogs?.length}</p>

      {/* sorting section */}
      <div></div>

      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {/* <BlogPost data={data} /> */}
        {blogs.map((blog, i) => (
          <BlogCards key={i} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;
