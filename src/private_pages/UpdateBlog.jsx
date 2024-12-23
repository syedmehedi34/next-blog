import { useEffect, useState } from "react";
import useSecureAxios from "../hooks/useSecureAxios";
import Swal from "sweetalert2";

const UpdateBlog = ({ handleModalUpdate, data, setData, count, setCount }) => {
  //   console.log(data);
  const { title, image, category, short_description, long_description } = data;
  const secureAxios = useSecureAxios();

  const [updatedData, setUpdatedData] = useState(data);
  //   const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUpdatedData(data);
  }, [data]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    // if (loading) return;

    const form = e.target;
    const title = form.title.value;
    const image = form.image.value;
    const category = form.category.value;
    const short_description = form.shortDescription.value;
    const long_description = form.longDescription.value;

    // Prepare the updated data object with fields to be updated
    const newData = {
      title,
      image,
      category,
      short_description,
      long_description,
      authorName: updatedData.authorName, // Use `updatedData` here
      authorImage: updatedData.authorImage,
      authorEmail: updatedData.authorEmail,
      submissionTime: updatedData.submissionTime,
    };

    try {
      //   setLoading(true);

      const response = await secureAxios.patch(
        `/all_blogs/${updatedData._id}`,
        newData
      );

      setUpdatedData(newData);
      setCount(count + 1);
      console.log("Updated Blog:", response.data);
      Swal.fire("Confirmed!", "Your Blog has been updated.", "success");
      handleModalUpdate();
    } catch (error) {
      console.error("Error updating the blog:", error);
      Swal.fire(
        "Error",
        "Something went wrong while updating the blog.",
        "error"
      );
    }
  };

  //
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 max-h-screen">
      <div className="max-w-2xl h-[90%] w-full bg-white shadow-xl rounded-lg p-8 overflow-auto">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          AddBlogs
        </h2>
        <form onSubmit={handleUpdate}>
          <div className="space-y-4">
            {/* Title Input */}
            <div>
              <label htmlFor="title" className="block text-gray-600">
                Title
              </label>
              <input
                defaultValue={title}
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
                defaultValue={image}
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
                defaultValue={category}
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
                defaultValue={short_description}
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
                defaultValue={long_description}
                name="longDescription"
                id="longDesc"
                placeholder="Enter long description"
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Button Section */}
            <div className="flex justify-between">
              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary py-3 w-1/2 bg-blue-500 text-white rounded-lg focus:outline-none"
              >
                Submit Blog Post
              </button>
              {/* Cancel Button */}
              <button
                type="button"
                onClick={handleModalUpdate}
                className="py-3 w-1/2 text-gray-600 bg-gray-300 rounded-lg focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>

        {/* Close Button */}
        <div className="absolute top-2 right-2">
          <button
            onClick={handleModalUpdate}
            className="text-gray-600 text-2xl"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlog;
