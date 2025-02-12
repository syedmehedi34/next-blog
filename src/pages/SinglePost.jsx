import React, { useContext, useEffect, useState } from "react";
import { FaComment, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { IoSend } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import useSecureAxios from "../hooks/useSecureAxios";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import { BsBookmarkHeartFill } from "react-icons/bs";
import useWishlistHook from "../hooks/wishlistHook";
import { DetailContext } from "../providers/BlogDetailsProvider";
import useDislikeButton from "../hooks/useDislikeButton";
import useLikeButton from "../hooks/useLikeButton";
import { CommentModal } from "../components/CommentModal";
import { TiArrowBack } from "react-icons/ti";

const SinglePost = () => {
  const [comments, setComments] = useState(0);
  const [commentCount, setCommentCount] = useState(1);
  const [count, setCount] = useState(0);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleLikeButton = useLikeButton();
  const handleDislike = useDislikeButton();

  const {
    likeCount,
    setLikeCount,
    dislikeCount,
    setDislikeCount,
    getTimeAgo,
    post,
    setPost,
  } = useContext(DetailContext);

  const { id } = useParams();
  const { user } = useAuth();
  const commenterName = user?.displayName || "Unknown";
  const commenterPhoto = user?.photoURL;

  const commentingTime = new Date().toLocaleString();

  //   get the single blog post data
  const secureAxios = useSecureAxios();
  useEffect(() => {
    setLoading(true);
    setError(null);

    secureAxios
      .get(`/blogs/${id}`)
      .then((res) => {
        // setData(res.data);
        setPost(res.data);
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
      commenterPhoto,
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
  const isAuthor = user?.email === post?.authorEmail;

  // const { handleButtonClick1 } = useButtonHandlers();
  const { handleWishlist } = useWishlistHook();
  //

  // - handle loading and error states in your component:
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
    <div className="max-w-4xl mx-auto relative p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg mb-5 mt-16">
      {/* Blog Image */}
      <div className="relative">
        <img
          src={
            post?.image ||
            "https://www.elegantthemes.com/blog/wp-content/uploads/2018/11/shutterstock_1049564585-960.jpg"
          }
          alt={post?.title}
          className="w-full h-64 object-cover rounded-lg"
        />
        <div className="absolute top-4 left-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-lg">
          {post?.category}
        </div>
      </div>

      {/* Blog Content */}
      <div className="mt-6">
        <h1 className="text-4xl font-bold text-gray-700 dark:text-gray-50">
          {post?.title}
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center mt-4 space-x-4">
            <img
              src={
                post?.authorImage ||
                "https://img.icons8.com/stickers/50/administrator-male.png"
              }
              alt={post?.authorName}
              className="w-12 h-12 rounded-full border-gray-300 border object-cover"
            />
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300 font-semibold">
                {post?.authorName || "Unknown Author"}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {post?.authorEmail || "author@domain.com"}
              </p>
            </div>
          </div>
          {isAuthor && (
            // <Link to={`/blogs/${id}/update`}>
            <div
              // onClick={handleModalUpdate}
              className="flex flex-col"
            >
              <Link to={`/blogs/update/${id}`}>
                <div className="btn btn-ghost hover:bg-inherit">
                  <FiEdit size={22} />
                  <p>Edit</p>
                </div>
              </Link>
            </div>
            // </Link>
          )}
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">
          Posted : {getTimeAgo(post?.submissionTime)}
        </p>

        <p className="text-gray-700 dark:text-gray-50 mt-6">
          <span className="font-bold">About :</span> {post?.short_description}
        </p>
        <p className="text-gray-700 dark:text-gray-300 mt-6">
          <span className="font-bold">Description :</span>
          {post?.long_description}
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
          onClick={() => handleWishlist(post)}
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
              onClick={() => handleLikeButton(post)}
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600"
            >
              <FaThumbsUp className="mr-1" />
              <span>{likeCount || 0}</span>
              {/* Display the updated like count */}
            </button>
          </div>
          <div>
            <button
              onClick={() => handleDislike(post)}
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-red-600"
            >
              <FaThumbsDown className="mr-1" />
              <span>{dislikeCount}</span>{" "}
              {/* Display the updated dislike count */}
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
          <FaComment />
          <span>{comments?.length || 0}</span>
        </div>
      </div>

      {/* Comments Modal */}
      {showCommentsModal && (
        <div>
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <CommentModal
              setShowCommentsModal={setShowCommentsModal}
              comments={comments}
            ></CommentModal>
          </div>
        </div>
      )}

      <div className="absolute -top-12 left-0">
        <Link to={-1}>
          <button className="flex items-center  gap-2 text-gray-600 dark:text-gray-50 btn min-h-0 h-10 bg-white dark:bg-gray-800 hover:bg-white shadow-none border-none text-lg">
            <span>
              <TiArrowBack />
            </span>{" "}
            <span>Back</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SinglePost;
