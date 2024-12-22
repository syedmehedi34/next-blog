import React, { createContext } from "react";

export const DetailContext = createContext();
const BlogDetailsProvider = ({ children }) => {
  const info = "hello";

  //
  //
  //
  return (
    <DetailContext.Provider value={info}>{children}</DetailContext.Provider>
  );
};

export default BlogDetailsProvider;
