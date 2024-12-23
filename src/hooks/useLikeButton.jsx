import { useContext } from "react";
import useSecureAxios from "./useSecureAxios";
import { DetailContext } from "../providers/BlogDetailsProvider";

const useLikeButton = () => {
  const secureAxios = useSecureAxios();
  const { setLikeCount, toggleLike, setToggleLike } = useContext(DetailContext);

  const handleLike = async (data) => {
    if (!data || !data._id) {
      console.error("Invalid data object or missing ID:", data);
      return;
    }

    // Safely handle undefined likeCount
    const currentLikeCount = data.likeCount ?? 0; // Default to 0 if undefined
    const newLikeCount = currentLikeCount + 1;

    // Optimistic UI update
    setLikeCount(newLikeCount);

    try {
      // Update like count in the backend
      await secureAxios.patch(`/blogs/${data._id}`, {
        likeCount: newLikeCount,
      });

      // Update data and toggle state after successful update
      data.likeCount = newLikeCount;
      setLikeCount(newLikeCount);
      setToggleLike(!toggleLike);
    } catch (error) {
      // Revert UI state on error
      setLikeCount(currentLikeCount);
      console.error("Error updating like count:", error);
    }
  };

  return handleLike;
};

export default useLikeButton;
