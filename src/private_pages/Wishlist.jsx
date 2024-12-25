import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useSecureAxios from "../hooks/useSecureAxios";
import WishlistTable from "../components/WishlistTable";

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
        // console.log(res.data);
        setWishlist(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching wishlist:", err);
        setLoading(false);
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
          <WishlistTable wishlist={wishlist} />
        )}
      </div>
    </div>
  );
};

export default Wishlist;
