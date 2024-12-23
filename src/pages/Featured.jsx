import React, { useEffect, useState } from "react";
import useSecureAxios from "../hooks/useSecureAxios";

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
          //   console.log(data);
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
      <h1>Featured</h1>
      <div>
        {/* Render featured data once it's loaded */}
        {featured.map((item) => (
          <div key={item._id}>
            {/* Assuming each featured item has an 'id' and other properties */}
            {/* <h2>{item.title}</h2> */}
            {/* <p>{item.description}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
