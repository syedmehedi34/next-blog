import React, { createContext, useState } from "react";

export const DetailContext = createContext();
const BlogDetailsProvider = ({ children }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);

  const [post, setPost] = useState(null); // single post data,, used in the SinglePost.jsx and UpdateBlog.jsx. Used this to store the single post data so that i don't have to fetch the data again and again.

  const [toggleLike, setToggleLike] = useState(false);
  const [toggleDislike, setToggleDislike] = useState(false);
  // const [updatedBlog, setUpdatedBlog] = useState(null);

  //
  const getTimeAgo = (dateString) => {
    try {
      const [datePart, timePart] = dateString.split(", ");
      const [day, month, year] = datePart.split("/").map(Number);
      const [hours, minutes, seconds] = timePart.split(":").map(Number);

      const submissionDate = new Date(
        year,
        month - 1,
        day,
        hours,
        minutes,
        seconds
      );
      const now = new Date();

      const diffInMs = now - submissionDate;
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      const diffInHours = Math.floor(diffInMinutes / 60);
      const remainingMinutes = diffInMinutes % 60;

      if (diffInMinutes < 0) {
        return "Invalid date (future time)";
      }

      if (diffInHours < 24) {
        // Less than a day ago
        if (diffInHours === 0) {
          return `${remainingMinutes}m${remainingMinutes !== 1 ? "s" : ""} ago`;
        }
        return `${diffInHours}h${
          diffInHours !== 1 ? "s" : ""
        } & ${remainingMinutes}m${remainingMinutes !== 1 ? "s" : ""} ago`;
      }

      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

      if (diffInDays === 0) {
        return "Recently Posted";
      }
      return `${diffInDays} Day${diffInDays > 1 ? "s" : ""} ago`;
    } catch (error) {
      console.error("Error parsing date:", error);
      return "No Time";
    }
  };

  //

  const allInfo = {
    likeCount,
    setLikeCount,
    dislikeCount,
    setDislikeCount,
    toggleLike,
    setToggleLike,
    toggleDislike,
    setToggleDislike,

    getTimeAgo,

    post,
    setPost,
  };
  //
  //
  //
  return (
    <DetailContext.Provider value={allInfo}>{children}</DetailContext.Provider>
  );
};

export default BlogDetailsProvider;
