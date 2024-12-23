import { useContext } from "react";
import useSecureAxios from "./useSecureAxios";
import { DetailContext } from "../providers/BlogDetailsProvider";

const useDislikeButton = () => {
  const secureAxios = useSecureAxios();
  const { dislikeCount, setDislikeCount, toggleDislike, setToggleDislike } =
    useContext(DetailContext);

  const handleDislike = async (data) => {
    if (!data || !data._id) {
      console.error("Invalid data object or missing ID:", data);
      return;
    }

    const id = data._id;

    // Safely handle undefined dislikeCount
    const oldDislikeCount = data.dislikeCount ?? 0; // Default to 0 if undefined
    const newDislikeCount = oldDislikeCount + 1;

    // Optimistic UI update
    setDislikeCount(newDislikeCount);

    try {
      // Update dislike count in the backend
      await secureAxios.patch(`/blogs/${id}`, {
        dislikeCount: newDislikeCount,
      });
      data.dislikeCount = newDislikeCount;
      setDislikeCount(newDislikeCount);
      setToggleDislike(!toggleDislike);
    } catch (error) {
      // Revert UI state on error
      setDislikeCount(oldDislikeCount);
      console.error("Error updating dislike count:", error);
    }
  };

  return handleDislike;
};

export default useDislikeButton;
