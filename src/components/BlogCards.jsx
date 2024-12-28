import { BsBookmarkHeartFill } from "react-icons/bs";
import { FaThumbsUp, FaThumbsDown, FaComment } from "react-icons/fa"; // Importing icons
import { SiReadme } from "react-icons/si";
import { Link } from "react-router-dom";
import useWishlistHook from "../hooks/wishlistHook";
// import { useContext } from "react";
import useDislikeButton from "../hooks/useDislikeButton";
import useLikeButton from "../hooks/useLikeButton";
import { useContext, useEffect, useState } from "react";
import { DetailContext } from "../providers/BlogDetailsProvider";
import axios from "axios";
import useSecureAxios from "../hooks/useSecureAxios";

const BlogCards = ({ blog }) => {
  const [likes, setLikes] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  // console.log(blog);

  const { handleWishlist } = useWishlistHook();
  const handleLikeButton = useLikeButton();
  const handleDislike = useDislikeButton();
  const axiosInstance = useSecureAxios();
  const { toggleLike, toggleDislike, getTimeAgo } = useContext(DetailContext);
  useEffect(() => {
    setLikes(blog?.likeCount);
    // console.log(likes);
  }, [toggleLike, toggleDislike]);

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await axiosInstance.get(`/comments/${blog._id}`);

        if (response.data) {
          setCommentCount(response.data.length);
        } else {
          console.warn("No data found:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    if (blog._id) {
      fetchComments();
    }
  }, [axiosInstance, blog._id]);
  return (
    <div className="max-w-md w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Image section */}
      <figure className="relative">
        <img
          src={blog?.image}
          alt="The Future of Web Development"
          className="w-full h-56 object-cover"
        />
        <div className="absolute top-0 left-0 bg-black bg-opacity-40 text-white text-xs font-medium px-3 py-1 rounded-br-lg">
          {blog?.category}
        </div>
      </figure>

      {/* Body section */}
      <div className="px-6 pb-6 pt-3 flex flex-col h-[350px]">
        <div className="mb-5 flex items-center justify-between">
          <p className="text-xs font-light ">
            <span className="font-semibold">Author :</span> {blog?.authorName}
          </p>
          <p className="text-xs font-light bg-gray-200 px-2 py-1 rounded-3xl">
            {getTimeAgo(blog?.submissionTime)}
          </p>
        </div>

        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          {blog?.title}
        </h3>

        {/* Ensuring this <p> takes maximum space */}
        <p className="text-gray-600 mb-4 flex-grow">
          <strong>Short Description:</strong> {blog?.short_description}
        </p>

        <div className="flex items-center justify-center *:flex-1 gap-5">
          <Link to={`/blogs/${blog._id}`}>
            <button className="btn btn-neutral text-white py-2 rounded-full bg-blue-900 border-none w-full flex-1">
              <span>
                <SiReadme size={17} />
              </span>
              Read More
            </button>
          </Link>

          <button
            onClick={() => handleWishlist(blog)}
            className="btn btn-outline   py-2 rounded-full  w-full flex-1"
          >
            <span>
              <BsBookmarkHeartFill size={16} />
            </span>
            Wishlist
          </button>
        </div>

        {/* Static Like, Dislike, and Comment Count Section */}
        <div className="flex items-center justify-between mt-6 space-x-6">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                handleLikeButton(blog);
              }}
              className="flex items-center text-gray-600 hover:text-blue-600"
            >
              <FaThumbsUp className="mr-1" />
              <span>{likes || 0}</span>
            </button>
            <button
              onClick={() => {
                handleDislike(blog);
              }}
              className="flex items-center text-gray-600 hover:text-red-600"
            >
              <FaThumbsDown className="mr-1" />
              <span>{blog?.dislikeCount || 0}</span>
            </button>
          </div>

          <div className="flex items-center space-x-2 text-gray-600">
            <FaComment />
            <span>{commentCount || 0}</span> {/* Display comment count */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCards;
