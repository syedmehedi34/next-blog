import React, { createContext } from "react";

export const DetailContext = createContext();
const BlogDetailsProvider = ({ children }) => {
  const allInfo = 5;

  //
  //
  //
  return (
    <DetailContext.Provider value={allInfo}>{children}</DetailContext.Provider>
  );
};

export default BlogDetailsProvider;
