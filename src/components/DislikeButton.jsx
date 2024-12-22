import React, { useState } from "react";
import { FaThumbsDown } from "react-icons/fa";
import useSecureAxios from "../hooks/useSecureAxios";

const DislikeButton = ({ data }) => {
  const secureAxios = useSecureAxios();
  const id = data._id;
  const [dislikeCount, setDislikeCount] = useState(data?.dislikeCount || 0); // Start with the current dislike count
  const [count, setCount] = useState(0);

  // Function to handle the "Dislike" button click
  const handleDislike = async () => {
    try {
      // Increment the dislike count in the frontend state
      const newDislikeCount = dislikeCount + 1;
      setDislikeCount(newDislikeCount); // Update the dislike count in the state

      // Prepare the data to be sent in the PATCH request
      const updatedData = { dislikeCount: newDislikeCount };

      // Send the PATCH request to update the dislike count in the database
      await secureAxios.patch(`/blogs/${id}`, updatedData);

      // Optionally, you can handle a success message or do other actions
      console.log("Dislike count updated successfully");
    } catch (error) {
      // If the request fails, revert the dislike count back
      setDislikeCount(dislikeCount);
      console.error("Error updating dislike count:", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleDislike}
        className="flex items-center text-gray-600 hover:text-red-600"
      >
        <FaThumbsDown className="mr-1" />
        <span>{dislikeCount}</span> {/* Display the updated dislike count */}
      </button>
    </div>
  );
};

export default DislikeButton;
