import { FaThumbsUp, FaThumbsDown, FaComment } from "react-icons/fa"; // Importing icons

const BlogPost = ({ blog }) => {
  console.log(blog);

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Image section */}
      <figure className="relative">
        <img
          src="https://www.elegantthemes.com/blog/wp-content/uploads/2018/11/shutterstock_1049564585-960.jpg"
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
            2 Min ago
          </p>
        </div>

        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          {blog?.title}
        </h3>

        {/* Ensuring this <p> takes maximum space */}
        <p className="text-gray-600 mb-4 flex-grow">
          <strong>Short Description:</strong> Exploring the latest trends in web
          development.
        </p>

        <div className="flex items-center justify-center *:flex-1 gap-5">
          <button className="  btn btn-neutral text-white py-2 rounded-md bg-blue-900 border-none w-fit">
            Read More
          </button>
          <button className="  btn btn-neutral text-white  py-2 rounded-md bg-blue-900 border-none w-fit">
            Wish List
          </button>
        </div>

        {/* Static Like, Dislike, and Comment Count Section */}
        <div className="flex items-center justify-between mt-6 space-x-6">
          <div className="flex items-center space-x-3">
            <button className="flex items-center text-gray-600 hover:text-blue-600">
              <FaThumbsUp className="mr-1" />
              <span>{blog?.likeCount || 0}</span>
            </button>
            <button className="flex items-center text-gray-600 hover:text-red-600">
              <FaThumbsDown className="mr-1" />
              <span>{blog?.dislikeCount || 0}</span>
            </button>
          </div>

          <div className="flex items-center space-x-2 text-gray-600">
            <FaComment />
            <span>{blog?.commentCount || 0}</span> {/* Display comment count */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
