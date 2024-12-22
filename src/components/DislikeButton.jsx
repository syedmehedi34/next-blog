import React from "react";
import { FaThumbsDown } from "react-icons/fa";

const DislikeButton = () => {
  const data = 5;
  return (
    <div>
      <button className="flex items-center text-gray-600 hover:text-red-600">
        <FaThumbsDown className="mr-1" />
        <span>{data?.dislikeCount || 0}</span>
      </button>
    </div>
  );
};

export default DislikeButton;
