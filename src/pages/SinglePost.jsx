import React, { useContext, useEffect, useState } from "react";
import { FaComment, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { IoSend } from "react-icons/io5";
import { useParams } from "react-router-dom";
import useSecureAxios from "../hooks/useSecureAxios";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import { BsBookmarkHeartFill } from "react-icons/bs";
import useWishlistHook from "../hooks/wishlistHook";
import { DetailContext } from "../providers/BlogDetailsProvider";
import useDislikeButton from "../hooks/useDislikeButton";
import useLikeButton from "../hooks/useLikeButton";
import UpdateBlog from "../private_pages/UpdateBlog";
import { div } from "motion/react-client";
import { CommentModal } from "../components/CommentModal";

const SinglePost = () => {
  const [comments, setComments] = useState(0);
  const [commentCount, setCommentCount] = useState(1);
  const [count, setCount] = useState(0);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // modal state
  const handleLikeButton = useLikeButton();
  const handleDislike = useDislikeButton();

  const { likeCount, setLikeCount, dislikeCount, setDislikeCount } =
    useContext(DetailContext);

  const { id } = useParams();
  const { user } = useAuth();
  const commenterName = user?.displayName || "Unknown";

  const commentingTime = new Date().toLocaleString();

  //   get the single blog post data
  const secureAxios = useSecureAxios();
  useEffect(() => {
    setLoading(true);
    setError(null);

    secureAxios
      .get(`/blogs/${id}`)
      .then((res) => {
        setData(res.data);
        setLikeCount(res.data.likeCount);
        setDislikeCount(res.data.dislikeCount);
        // console.log(res.data);
      })
      .catch((err) => {
        setError(err.message || "An error occurred");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, count]);

  //   post a comment
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    // console.log(comment);
    const commentData = {
      blogId: id,
      comment,
      commenterName,
      commentingTime,
    };

    secureAxios.post(`/comments/${id}`, commentData).then((res) => {
      const data = res.data;
      if (data) {
        toast.success("Comment added successfully", {
          position: "top-left",
          autoClose: 1500,
        });
        e.target.reset();
        setCount(count + 1);
      }
    });
  };

  // show the comments from database
  useEffect(() => {
    secureAxios
      .get(`/comments/${id}`)
      .then((res) => {
        setComments(res.data);
        setCommentCount(res.data.length);
        // console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [count]);

  // check if the user is the author of the blog post to disable the comment section
  const isAuthor = user?.email === data?.authorEmail;

  // const { handleButtonClick1 } = useButtonHandlers();
  const { handleWishlist } = useWishlistHook();

  //

  // function for the modal open and close
  const handleModalUpdate = () => {
    setIsOpen(!isOpen);
    // console.log("clicked");
  };

  // ' handle loading and error states in your component:
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }
  // console.log(data);
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg my-5">
      {/* Blog Image */}
      <div className="relative">
        <img
          src={
            data?.image_url ||
            "https://www.elegantthemes.com/blog/wp-content/uploads/2018/11/shutterstock_1049564585-960.jpg"
          }
          alt={data?.title}
          className="w-full h-64 object-cover rounded-lg"
        />
        <div className="absolute top-4 left-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-lg">
          {data?.category}
        </div>
      </div>

      {/* Blog Content */}
      <div className="mt-6">
        <h1 className="text-4xl font-bold text-gray-700">{data?.title}</h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center mt-4 space-x-4">
            <img
              src={
                data?.authorPhoto ||
                "https://img.icons8.com/stickers/50/administrator-male.png"
              }
              alt={data?.authorName}
              className="w-12 h-12 rounded-full border-gray-300 border object-cover"
            />
            <div>
              <p className="text-sm text-gray-700 font-semibold">
                {data?.authorName || "Unknown Author"}
              </p>
              <p className="text-sm text-gray-500">
                {data?.authorEmail || "author@domain.com"}
              </p>
            </div>
          </div>
          {isAuthor && (
            // <Link to={`/blogs/${id}/update`}>
            <div onClick={handleModalUpdate} className="flex flex-col">
              <div className="btn btn-ghost hover:bg-inherit">
                <FiEdit size={22} />
                <p>Edit</p>
              </div>
            </div>
            // </Link>
          )}
          {isOpen && (
            <div>
              <UpdateBlog
                handleModalUpdate={handleModalUpdate}
                data={data}
                setData={setData}
                setCount={setCount}
                count={count}
              ></UpdateBlog>
            </div>
          )}
        </div>

        <p className="text-sm text-gray-500 mt-2">
          Posted {data?.postedTime || "a few"} min ago
        </p>

        <p className="text-gray-700 mt-6">
          <span className="font-bold">About :</span> {data?.short_description}
        </p>
        <p className="text-gray-700 mt-6">
          <span className="font-bold">Description :</span>
          {data?.long_description}
        </p>
      </div>

      {/* Comment Form */}
      <form
        onSubmit={handleCommentSubmit}
        className="mt-8 flex flex-col items-start space-y-4 relative"
      >
        <textarea
          className="textarea border border-gray-300 w-full"
          rows="3"
          placeholder={
            isAuthor ? "Authors cannot comment." : "Write your comment..."
          }
          name="comment"
          disabled={isAuthor}
        />

        <button
          disabled={isAuthor}
          type="submit"
          className="absolute top-[3px] right-5 text-gray-600 "
        >
          <IoSend size={20} />
        </button>
      </form>
      {/* Buttons */}
      <div className="flex gap-5 items-center mt-4">
        <button
          className="btn btn-neutral min-h-0 h-10 text-white"
          onClick={() => setShowCommentsModal(true)}
        >
          View Comments ({commentCount})
        </button>

        <button
          onClick={() => handleWishlist(data)}
          className="btn btn-outline min-h-0 h-10 "
        >
          <span>
            <BsBookmarkHeartFill />
          </span>
          Add to Wishlist
        </button>
      </div>

      {/*  Like, Dislike, and Comment Count Section */}
      <div className="flex items-center justify-between mt-8 space-x-6">
        <div className="flex items-center space-x-5">
          <div>
            <button
              onClick={() => handleLikeButton(data)}
              className="flex items-center text-gray-600 hover:text-blue-600"
            >
              <FaThumbsUp className="mr-1" />
              <span>{likeCount || 0}</span>
              {/* Display the updated like count */}
            </button>
          </div>
          <div>
            <button
              onClick={() => handleDislike(data)}
              className="flex items-center text-gray-600 hover:text-red-600"
            >
              <FaThumbsDown className="mr-1" />
              <span>{dislikeCount}</span>{" "}
              {/* Display the updated dislike count */}
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <FaComment />
          <span>{comments?.length || 0}</span>
        </div>
      </div>

      {/* Comments Modal */}
      {showCommentsModal && (
        <div>
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            {/* <div className="bg-white p-6 rounded-lg max-w-lg w-full">
              <ul className="space-y-3  overflow-scroll h-40">
                {comments.map((comment, index) => (
                  <li
                    key={index}
                    className="text-gray-700 bg-gray-100 py-1 px-2 rounded-md"
                  >
                    {comment.comment}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowCommentsModal(false)}
                className="btn btn-secondary text-white py-2 px-4 rounded-md bg-red-600 hover:bg-red-700 mt-4 transition duration-200"
              >
                Close
              </button>
            </div> */}

            <div>
              <CommentModal
                setShowCommentsModal={setShowCommentsModal}
                comments={comments}
              ></CommentModal>
            </div>
          </div>

          {/* 
          
          
          
          
          */}
          {/* 
          
          
          
          
          */}
        </div>
      )}
    </div>
  );
};

export default SinglePost;
