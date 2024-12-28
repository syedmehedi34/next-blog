import React from "react";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import useSecureAxios from "../hooks/useSecureAxios";

const AddBlog = () => {
  const { user } = useAuth();
  const authorName = user.displayName;
  const authorImage = user.photoURL;
  const authorEmail = user.email;
  const secureAxios = useSecureAxios();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const image = form.image.value;
    const category = form.category.value;
    const short_description = form.shortDescription.value;
    const long_description = form.longDescription.value;

    // Get the current date and time
    const submissionTime = new Date().toLocaleString();

    const data = {
      title,
      image,
      category,
      short_description,
      long_description,
      authorName,
      authorImage,
      authorEmail,
      submissionTime,
    };

    secureAxios.post("/all_blogs", data).then((res) => {
      const data = res.data;
      if (data) {
        // console.log(data);
        Swal.fire({
          title: "Success!",
          text: "Coffee added successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
        e.target.reset();
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-4">
      <div className="max-w-2xl w-full bg-white shadow-xl rounded-lg p-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          AddBlogs
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Title Input */}
            <div>
              <label htmlFor="title" className="block text-gray-600">
                Title
              </label>
              <input
                name="title"
                type="text"
                id="title"
                placeholder="Enter blog title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Image URL Input */}
            <div>
              <label htmlFor="imageUrl" className="block text-gray-600">
                Image URL
              </label>
              <input
                name="image"
                type="url"
                id="imageUrl"
                placeholder="Enter image URL"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Category Dropdown */}
            <div>
              <label htmlFor="category" className="block text-gray-600">
                Category
              </label>
              <select
                name="category"
                id="category"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Category</option>
                <option value="Technology">Technology</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Business">Business</option>
                <option value="Health">Health</option>
              </select>
            </div>

            {/* Short Description */}
            <div>
              <label htmlFor="shortDesc" className="block text-gray-600">
                Short Description
              </label>
              <textarea
                name="shortDescription"
                id="shortDesc"
                placeholder="Enter short description"
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Long Description */}
            <div>
              <label htmlFor="longDesc" className="block text-gray-600">
                Long Description
              </label>
              <textarea
                name="longDescription"
                id="longDesc"
                placeholder="Enter long description"
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="btn btn-primary w-full py-3 mt-4 text-white rounded-lg focus:outline-none"
              >
                Submit Blog Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
