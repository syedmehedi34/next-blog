import React, { useEffect, useState } from "react";
import useSecureAxios from "../hooks/useSecureAxios";

const RecentBlogs = () => {
  const [blogs, setBlogs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const getTimeAgo = (dateString) => {
  //   try {
  //     const [datePart, timePart] = dateString.split(", ");
  //     const [day, month, year] = datePart.split("/").map(Number);
  //     const [hours, minutes, seconds] = timePart.split(":").map(Number);

  //     const submissionDate = new Date(
  //       year,
  //       month - 1,
  //       day,
  //       hours,
  //       minutes,
  //       seconds
  //     );
  //     const now = new Date();

  //     const diffInMs = now - submissionDate;
  //     const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  //     if (isNaN(diffInDays)) {
  //       return "Invalid date format";
  //     }

  //     if (diffInDays === 1) {
  //       return "Recently Posted";
  //     }
  //     return `Posted ${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  //   } catch (error) {
  //     console.error("Error parsing date:", error);
  //     return "Error with date";
  //   }
  // };

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
          return `${remainingMinutes} min${
            remainingMinutes !== 1 ? "s" : ""
          } ago`;
        }
        return `${diffInHours} hour${
          diffInHours !== 1 ? "s" : ""
        } and ${remainingMinutes} min${remainingMinutes !== 1 ? "s" : ""} ago`;
      }

      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

      if (diffInDays === 0) {
        return "Recently Posted";
      }
      return `${diffInDays} Day${diffInDays > 1 ? "s" : ""} ago`;
    } catch (error) {
      console.error("Error parsing date:", error);
      return "Error with date";
    }
  };

  const axiosInstance = useSecureAxios();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/latest");
        setBlogs(response.data);
        console.log(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section className="py-16 w-11/12 mx-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Recent Blog Posts
        </h2>
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
                  className="w-full h-48 object-cover"
                />
                <button
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
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  <p className="hover:text-blue-600">{blog.title}</p>
                </h3>
                <p className="text-gray-600 mb-4">{blog.short_description}</p>
                <div className="flex items-center mb-4">
                  <img
                    src={blog.authorImage}
                    alt={blog.authorName}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {blog.authorName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {getTimeAgo(blog.submissionTime)}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <p className="flex-1 text-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Details
                  </p>
                  <button className="flex-1 border-2 border-blue-600 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors">
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
