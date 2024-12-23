import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useSecureAxios from "../hooks/useSecureAxios";

const Wishlist = () => {
  const secureAxios = useSecureAxios();
  const { user } = useAuth();
  const userEmail = user.email;

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    secureAxios
      .get("/wishlist", { params: { userEmail } })
      .then((res) => {
        setWishlist(res.data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((err) => {
        console.error("Error fetching wishlist:", err);
        setLoading(false); // Set loading to false if there's an error
      });
  }, [userEmail]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-11/12 mx-auto mt-7">
      <h1>Wishlist</h1>

      <div>
        {/* Render wishlist data */}
        {wishlist.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          wishlist.map((item) => (
            <div key={item._id}>
              {/* <h2>{item.title}</h2> */}
              {/* <p>{item.description}</p> */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Wishlist;
