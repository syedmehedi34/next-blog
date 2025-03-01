import React, { useContext, useEffect, useState } from "react";
import useSecureAxios from "../hooks/useSecureAxios";
import { Link } from "react-router-dom";
import useWishlistHook from "../hooks/wishlistHook";
import { DetailContext } from "../providers/BlogDetailsProvider";
import Loading from "../pages/Loading";

const RecentBlogs = () => {
  const [blogs, setBlogs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { handleWishlist } = useWishlistHook();
  const { getTimeAgo } = useContext(DetailContext);

  const axiosInstance = useSecureAxios();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/latest");
        setBlogs(response.data);
        // console.log(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div>
        <Loading />;
      </div>
    );

  if (error) return <div>Error: {error.message}</div>;

  return (
    <section className="py-16 w-11/12 mx-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center dark:text-gray-50">
          Recent Blog Posts
        </h2>
        <p className="text-xl font-[500] text-gray-900 mb-12 text-center dark:text-gray-50">
          Fresh Insights, Timeless Inspiration –{" "}
          <span className="text-red-600">Dive into Our Recent Blogs!</span>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden group"
            >
              <div className="relative">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover dark:bg-gray-800"
                />
                {/* // todo : implement later */}
                {/* <button
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  title="Add to Wishlist"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600 hover:text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button> */}
              </div>
              <div className="p-6 flex flex-col h-[300px] dark:bg-gray-800">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 dark:text-gray-50">
                  <p className="hover:text-blue-600 dark:text-gray-50">
                    {blog.title}
                  </p>
                </h3>
                <p className="text-gray-600 mb-4 dark:text-gray-50">
                  {blog.short_description}
                </p>

                <div className="flex-1 flex-grow">
                  <div className="flex items-center mb-4">
                    <img
                      src={
                        blog?.authorImage ||
                        "https://img.icons8.com/office/40/person-male-skin-type-4.png"
                      }
                      alt={blog.authorName}
                      className="w-10 h-10 object-cover rounded-full mr-3 border border-gray-300 "
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                        {blog.authorName}
                      </p>
                      <p className="text-[12px] text-gray-500 dark:text-gray-400">
                        {getTimeAgo(blog.submissionTime)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Link className="flex-1" to={`/blogs/${blog._id}`}>
                    <button className="btn btn-primary min-h-0 h-10 rounded-full w-full text-center bg-blue-600 text-white py-2 px-4 ">
                      Details
                    </button>
                  </Link>
                  <button
                    onClick={() => handleWishlist(blog)}
                    className="flex-1 border-2 border-blue-600 text-blue-600 py-2 px-4 hover:bg-blue-50 transition-colors min-h-0 h-10 rounded-full"
                  >
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentBlogs;
