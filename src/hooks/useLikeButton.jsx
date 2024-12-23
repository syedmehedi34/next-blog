import { useContext } from "react";
import useSecureAxios from "./useSecureAxios";
import { DetailContext } from "../providers/BlogDetailsProvider";

const useLikeButton = () => {
  const secureAxios = useSecureAxios();
  const { likeCount, setLikeCount } = useContext(DetailContext);

  const handleLike = async (data) => {
    if (!data || !data._id) {
      console.error("Invalid data object:", data);
      return;
    }

    const id = data._id;

    // Use context state for the latest like count
    const oldLikeCount = likeCount;
    const newLikeCount = oldLikeCount + 1;

    // Optimistic UI update
    setLikeCount(newLikeCount);

    try {
      // Update like count in the backend
      await secureAxios.patch(`/blogs/${id}`, { likeCount: newLikeCount });
      console.log("Like count updated successfully");
    } catch (error) {
      // Revert UI state on error
      setLikeCount(oldLikeCount);
      console.error("Error updating like count:", error);
    }
  };

  return handleLike;
};

export default useLikeButton;
