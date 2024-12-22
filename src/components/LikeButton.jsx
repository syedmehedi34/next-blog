import React, { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import useSecureAxios from "../hooks/useSecureAxios";

const LikeButton = ({ data }) => {
  const secureAxios = useSecureAxios();
  const id = data._id;
  const [likeCount, setLikeCount] = useState(data?.likeCount || 0);
  console.log(likeCount);

  // patch the like count
  const handleLike = async (id) => {
    console.log(id);
    // patch

    try {
      // Increment the like count
      const updatedData = { likeCount: data.likeCount + 1 };

      // Make the patch request using secureAxios
      await secureAxios.patch(`/blogs/${id}`, updatedData);

      // Optionally, handle successful update or state update here
      console.log("Like count updated successfully");
    } catch (error) {
      console.error("Error updating like count:", error);
    }
  };
  return (
    <div>
      <button
        onClick={() => handleLike(id)}
        className="flex items-center text-gray-600 hover:text-blue-600"
      >
        <FaThumbsUp className="mr-1" />
        <span>{0}</span>
      </button>
    </div>
  );
};

export default LikeButton;
