import React, { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import useSecureAxios from "../hooks/useSecureAxios";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const LikeButton = ({ data }) => {
  const secureAxios = useSecureAxios();
  const id = data._id; // Get the ID from the data prop
  const [likeCount, setLikeCount] = useState(data?.likeCount || 0); // State to store the like count

  // Function to handle the "Like" button click
  const handleLike = async () => {
    try {
      // Increment the like count in the frontend state
      const newLikeCount = likeCount + 1;
      setLikeCount(newLikeCount);

      const updatedData = { likeCount: newLikeCount };

      await secureAxios.patch(`/blogs/${id}`, updatedData);

      console.log("Like count updated successfully");
    } catch (error) {
      setLikeCount(likeCount);
      console.error("Error updating like count:", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleLike}
        className="flex items-center text-gray-600 hover:text-blue-600"
      >
        <FaThumbsUp className="mr-1" />
        <span>{likeCount}</span> {/* Display the updated like count */}
      </button>
    </div>
  );
};

export default LikeButton;
