import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useSecureAxios from "../hooks/useSecureAxios";
import WishlistTable from "../components/WishlistTable";
import Loading from "../pages/Loading";

const Wishlist = () => {
  const secureAxios = useSecureAxios();
  const { user } = useAuth();
  const userEmail = user?.email;
  // console.log(userEmail);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    secureAxios
      // .get(`/wishlist?userEmail=${userEmail}`)
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
    return (
      <div className="w-11/12 mx-auto mt-7 mb-12">
        <div className="bg-gray-800 text-white py-5 px-6 rounded-t-md shadow-md">
          <h2 className="text-2xl font-bold">Featured Blogs</h2>
          <p className="text-sm text-gray-300 mt-2">
            All the featured blogs are here, organized in one place.
          </p>
        </div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto mt-7">
      {/* <h1>Wishlist</h1> */}
      <div className="bg-gray-800 text-white py-5 px-6 rounded-t-md shadow-md">
        <h2 className="text-2xl font-bold">Your Wishlist </h2>
        <p className="text-sm text-gray-300 mt-2">
          All the blogs you've added to wishlist, organized in one place.
        </p>
      </div>

      <div>
        {/* Render wishlist data */}
        {wishlist.length === 0 ? (
          <div className="mb-12">
            <h3 className="text-2xl mt-10 text-center">
              No items in your wishlist
            </h3>
            <p className="text-gray-500 mt-2 text-center">
              Add items to your wishlist by clicking the heart icon on the blog
              page.
            </p>
          </div>
        ) : (
          <WishlistTable wishlist={wishlist} />
        )}
      </div>
    </div>
  );
};

export default Wishlist;
