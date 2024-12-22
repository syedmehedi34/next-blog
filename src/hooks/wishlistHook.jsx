import { useCallback } from "react";

const wishlistHook = () => {
  // Define all your onClick handlers here
  const handleWishlist = useCallback(() => {
    console.log("Button 1 clicked!");
    // Add more logic here
  }, []);

  // Return an object with all handlers
  return {
    handleWishlist,
  };
};

export default wishlistHook;
