import axios from "axios";
import React, { useEffect, useState } from "react";

const AllBlogs = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //
  useEffect(() => {
    async function fetchAllData() {
      try {
        const response = await axios.get("http://localhost:5001/all_blogs");

        if (response.data) {
          console.log("Fetched Data:", response.data);
          setData(response.data);
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
  return <div>Total Blogs : {data?.length}</div>;
};

export default AllBlogs;
