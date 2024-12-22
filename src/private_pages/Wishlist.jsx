import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useSecureAxios from "../hooks/useSecureAxios";

const Wishlist = () => {
  const secureAxios = useSecureAxios();
  const { user } = useAuth();
  const userEmail = user.email;
  // console.log(userEmil);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    secureAxios
      .get("/wishlist", { params: { userEmail } })
      .then((res) => {
        setWishlist(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Error fetching wishlist:", err);
      });
  }, [userEmail]);

  return (
    <div>
      <h1>wishlist</h1>
    </div>
  );
};

export default Wishlist;
