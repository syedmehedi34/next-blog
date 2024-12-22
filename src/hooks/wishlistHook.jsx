import { useCallback } from "react";
import useSecureAxios from "./useSecureAxios";
import Swal from "sweetalert2";
import useAuth from "./useAuth";

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
      //   const data = { ...wish, wishPerson };
      const { _id, ...wishWithoutId } = wish;
      const blogID = wish._id;
      const data = { ...wishWithoutId, wishPerson, blogID };
      //   console.log(data);

      secureAxios
        .post("/wishlist", data)
        .then((res) => {
          const responseData = res.data;
          if (responseData) {
            console.log(responseData);
            Swal.fire({
              title: "Success!",
              text: "Item added to wishlist successfully!",
              icon: "success",
              confirmButtonText: "Ok",
            });
          }
        })
        .catch((error) => {
          console.error("Error adding to wishlist", error);
          Swal.fire({
            title: "Error!",
            text: "There was an issue adding to the wishlist.",
            icon: "error",
            confirmButtonText: "Try Again",
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
