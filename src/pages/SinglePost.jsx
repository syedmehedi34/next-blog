import React, { useEffect, useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaComment } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { IoSend } from "react-icons/io5";
import { useParams } from "react-router-dom";

const SinglePost = () => {
  // ? --------------------------
  const [comments, setComments] = useState([
    "Great insights on web development!",
    "Loved the article, very informative.",
    "The future looks bright for developers.",
  ]);
  const [newComment, setNewComment] = useState("");
  const [showCommentsModal, setShowCommentsModal] = useState(false);

  const blog = {
    _id: "6766bb956a2c386d6f436800",
    title: "The Future of Web Development",
    image_url:
      "https://www.elegantthemes.com/blog/wp-content/uploads/2018/11/shutterstock_1049564585-960.jpg",
    category: "Technology",
    short_description: "Exploring the latest trends in web development.",
    long_description:
      "In this post, we discuss the future of web development, including the rise of AI-driven tools, serverless architecture, and progressive web apps. We explore how these trends are shaping the industry and what web developers need to know to stay ahead.",
    authorName: "John Doe",
    authorPhoto: "https://randomuser.me/api/portraits/men/32.jpg", // Example author photo
    authorEmail: "john.doe@example.com",
    postedTime: "2 hours ago",
    likeCount: 10,
    dislikeCount: 50,
    commentCount: 25,
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments((prev) => [...prev, newComment.trim()]);
      setNewComment("");
    }
  };
  // ? --------------------------

  //. ------------------
  const { id } = useParams();
  console.log(id);

  //   useEffect(() => {
  //     // Async function to fetch data by ID
  //     async function fetchDataById() {
  //       try {
  //         // Replace with your actual API URL
  //         const response = await axios.get(`http://localhost:5001/path/${id}`);

  //         // Check if the response indicates success
  //         if (response.data.success) {
  //           console.log("Fetched Data:", response.data.data);
  //           setData(response.data.data); // Store data in state
  //         } else {
  //           console.warn("No data found:", response.data.message);
  //           setError("No data found");
  //         }
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //         setError("Error fetching data");
  //       } finally {
  //         setLoading(false);
  //       }
  //     }

  //     // Fetch data by ID if the ID is valid
  //     if (id) {
  //       fetchDataById(id);
  //     }
  //   }, [id]);

  //. ------------------

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg my-5">
      {/* Blog Image */}
      <div className="relative">
        <img
          src={blog.image_url}
          alt={blog.title}
          className="w-full h-64 object-cover rounded-lg"
        />
        <div className="absolute top-4 left-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-lg">
          {blog.category}
        </div>
      </div>

      {/* Blog Content */}
      <div className="mt-6">
        <h1 className="text-4xl font-bold text-gray-800">{blog.title}</h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center mt-4 space-x-4">
            <img
              src={blog.authorPhoto}
              alt={blog.authorName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="text-sm text-gray-700 font-semibold">
                {blog.authorName}
              </p>
              <p className="text-sm text-gray-500">{blog.authorEmail}</p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="btn btn-ghost hover:bg-inherit">
              <FiEdit size={22} />
              <p>Edit</p>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-2">Posted {blog.postedTime}</p>

        <p className="text-gray-700 mt-6">
          Short description : {blog.short_description}
        </p>
        <p className="text-gray-700 mt-6">
          <span className="font-bold">Description :</span>{" "}
          {blog.long_description}
        </p>
      </div>

      {/* Comment Form */}
      <form
        onSubmit={handleCommentSubmit}
        className="mt-8 flex flex-col items-start space-y-4 relative"
      >
        <textarea
          className="w-full p-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          rows="3"
          placeholder="Write your comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          type="submit"
          className="absolute top-[3px] right-5 text-gray-600"
        >
          <IoSend size={20} />
        </button>
      </form>
      {/* Buttons */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="btn btn-neutral min-h-0 h-10 text-white"
          onClick={() => setShowCommentsModal(true)}
        >
          View Comments ({comments.length})
        </button>
      </div>

      {/* Static Like, Dislike, and Comment Count Section */}
      <div className="flex items-center justify-between mt-8 space-x-6">
        <div className="flex items-center space-x-3">
          <button className="flex items-center text-gray-600 hover:text-blue-600">
            <FaThumbsUp className="mr-1" />
            <span>{blog.likeCount}</span>
          </button>
          <button className="flex items-center text-gray-600 hover:text-red-600">
            <FaThumbsDown className="mr-1" />
            <span>{blog.dislikeCount}</span>
          </button>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <FaComment />
          <span>{comments.length}</span>
        </div>
      </div>

      {/* Comments Modal */}
      {showCommentsModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h2 className="text-2xl font-semibold mb-4">Comments</h2>
            <ul className="space-y-3  overflow-scroll h-40">
              {comments.map((comment, index) => (
                <li
                  key={index}
                  className="text-gray-700 bg-gray-100 py-1 px-2 rounded-md"
                >
                  {comment}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowCommentsModal(false)}
              className="btn btn-secondary text-white py-2 px-4 rounded-md bg-red-600 hover:bg-red-700 mt-4 transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePost;
