import React, { createContext, useState } from "react";

export const DetailContext = createContext();
const BlogDetailsProvider = ({ children }) => {
  const [likeCount, setLikeCount] = useState(0);

  const allInfo = {
    likeCount,
    setLikeCount,
  };
  //
  //
  //
  return (
    <DetailContext.Provider value={allInfo}>{children}</DetailContext.Provider>
  );
};

export default BlogDetailsProvider;
