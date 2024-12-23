import React, { createContext, useState } from "react";

export const DetailContext = createContext();
const BlogDetailsProvider = ({ children }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);

  const [toggleLike, setToggleLike] = useState(false);
  const [toggleDislike, setToggleDislike] = useState(false);

  const allInfo = {
    likeCount,
    setLikeCount,
    dislikeCount,
    setDislikeCount,
    toggleLike,
    setToggleLike,
    toggleDislike,
    setToggleDislike,
  };
  //
  //
  //
  return (
    <DetailContext.Provider value={allInfo}>{children}</DetailContext.Provider>
  );
};

export default BlogDetailsProvider;
