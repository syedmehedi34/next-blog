import { useCallback } from "react";
import useSecureAxios from "./useSecureAxios";
import useAuth from "./useAuth";
import { toast } from "react-toastify";

const wishlistHook = () => {
  const secureAxios = useSecureAxios();
  const { user } = useAuth();
  const wishPerson = user?.email;
  //   console.log(wishPerson);

  // Define all your onClick handlers here
  const handleWishlist = useCallback(
    (wish) => {
      // Log the data to check
      //   console.log(wish);
      const {} = wish;
      const { _id, ...wishWithoutId } = wish;
      const blogID = wish._id;
      const data = { ...wishWithoutId, wishPerson, blogID };
      //   console.log(data);

      secureAxios
        .post("/wishlist", data)
        .then((res) => {
          const responseData = res.data;
          if (responseData) {
            // console.log(responseData);
            toast.success("Item added to wishlist successfully!", {
              position: "top-left",
              autoClose: 1500,
            });
          }
        })
        .catch((error) => {
          // console.error("Error adding to wishlist", error);
          toast.error("Already added to wishlist", {
            position: "top-left",
            autoClose: 1500,
          });
        });
    },
    [secureAxios]
  );

  // Return an object with all handlers
  return {
    handleWishlist,
  };
};

export default wishlistHook;
