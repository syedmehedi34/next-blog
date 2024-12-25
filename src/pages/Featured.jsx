import React, { useEffect, useState } from "react";
import useSecureAxios from "../hooks/useSecureAxios";
import FeaturedTable from "../components/FeaturedTable";

const Featured = () => {
  const secureAxios = useSecureAxios();
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    // Fetch featured data
    secureAxios
      .get("/featured")
      .then((res) => {
        const data = res.data;
        if (data) {
          // console.log(data);
          setFeatured(data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-11/12 mx-auto mt-7">
      {/* <h1>Featured</h1> */}

      <div className="bg-gray-800 text-white py-5 px-6 rounded-t-md shadow-md">
        <h2 className="text-2xl font-bold">Featured Blogs</h2>
        <p className="text-sm text-gray-300 mt-2">
          All the featured blogs are here, organized in one place.
        </p>
      </div>

      <div>
        {featured.length === 0 ? (
          <div>
            <h3 className="text-2xl mt-10 text-center">No Blogs in Featured</h3>
          </div>
        ) : (
          <FeaturedTable featured={featured} />
        )}
      </div>
    </div>
  );
};

export default Featured;
