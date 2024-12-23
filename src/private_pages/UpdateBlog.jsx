const UpdateBlog = ({ handleModalUpdate, data }) => {
  console.log(data);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 max-h-screen">
      <div className="max-w-2xl h-[90%] w-full bg-white shadow-xl rounded-lg p-8 overflow-auto">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          AddBlogs
        </h2>
        <form>
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
