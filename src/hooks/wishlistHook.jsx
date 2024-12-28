import { useCallback } from "react";
import useSecureAxios from "./useSecureAxios";
import useAuth from "./useAuth";
import { toast } from "react-toastify";

const wishlistHook = () => {
  const secureAxios = useSecureAxios();
  const { user } = useAuth();
  const wishPerson = user?.email;

  const handleWishlist = useCallback(
    (wish) => {
      // Check if wishPerson is available
      if (!wishPerson) {
        toast.error("Please log in to add items to your wishlist.", {
          position: "top-left",
          autoClose: 1500,
        });
        return;
      }

      const { _id, ...wishWithoutId } = wish;
      const blogID = wish._id;
      const data = { ...wishWithoutId, wishPerson, blogID };

      secureAxios
        .post("/wishlist", data)
        .then((res) => {
          const responseData = res.data;
          if (responseData) {
            toast.success("Item added to wishlist successfully!", {
              position: "top-left",
              autoClose: 1500,
            });
          }
        })
        .catch((error) => {
          toast.error("Already added to wishlist", {
            position: "top-left",
            autoClose: 1500,
          });
        });
    },
    [secureAxios, wishPerson]
  );

  return {
    handleWishlist,
  };
};

export default wishlistHook;
