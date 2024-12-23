import { useEffect, useState } from "react";
import useSecureAxios from "../hooks/useSecureAxios";
import Swal from "sweetalert2";

const UpdateBlog = ({ handleModalUpdate, data, setData }) => {
  //   console.log(data);
  const { title, image, category, short_description, long_description } = data;
  const secureAxios = useSecureAxios();

  const [updatedData, setUpdatedData] = useState(data);
  const [loading, setLoading] = useState(false);

  //
  //   const [updatedBlog, setUpdatedBlog] = useState(data);

  //

  //   const handleUpdate = async (e) => {
  //     e.preventDefault();
  //     const form = e.target;
  //     const title = form.title.value;
  //     const image = form.image.value;
  //     const category = form.category.value;
  //     const short_description = form.shortDescription.value;
  //     const long_description = form.longDescription.value;

  //     // Prepare the updated data object with fields to be updated
  //     const updatedData = {
  //       title,
  //       image,
  //       category,
  //       short_description,
  //       long_description,
  //       authorName: data.authorName,
  //       authorImage: data.authorImage,
  //       authorEmail: data.authorEmail,
  //       submissionTime: data.submissionTime,
  //     };

  //     try {
  //       // Send the PATCH request to update the blog fields
  //       const response = await secureAxios.patch(
  //         `/all_blogs/${data._id}`,
  //         updatedData
  //       );

  //       // Show SweetAlert confirmation toast
  //       Swal.fire({
  //         title: "Data Updated Successfully!",
  //         icon: "success",
  //         text: "Do you want to confirm the changes?",
  //         showCancelButton: true,
  //         confirmButtonText: "Yes, confirm!",
  //         cancelButtonText: "Cancel",
  //         reverseButtons: true, // To reverse the order of confirm/cancel buttons
  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           // If user clicks 'Yes, confirm!', update the state
  //           setData(updatedData);
  //           console.log("Updated Blog:", response.data);
  //           Swal.fire("Confirmed!", "Your data has been updated.", "success");
  //           handleModalUpdate();
  //         } else {
  //           // If user clicks 'Cancel', no further action
  //           Swal.fire("Cancelled", "Your changes were not saved.", "error");
  //         }
  //       });
  //     } catch (error) {
  //       // Handle error
  //       console.error("Error updating the blog:", error);
  //       Swal.fire(
  //         "Error",
  //         "Something went wrong while updating the blog.",
  //         "error"
  //       );
  //     }
  //   };

  useEffect(() => {
    // Sync updatedData with the latest `data` prop
    setUpdatedData(data);
  }, [data]);
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (loading) return; // Prevent submitting while already loading

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
      setLoading(true); // Set loading to true to prevent multiple submits

      // Send the PATCH request to update the blog fields
      const response = await secureAxios.patch(
        `/all_blogs/${updatedData._id}`,
        newData
      );

      // Show SweetAlert confirmation toast
      Swal.fire({
        title: "Data Updated Successfully!",
        icon: "success",
        text: "Do you want to confirm the changes?",
        showCancelButton: true,
        confirmButtonText: "Yes, confirm!",
        cancelButtonText: "Cancel",
        reverseButtons: true, // Reverse the order of confirm/cancel buttons
      }).then((result) => {
        if (result.isConfirmed) {
          // If user clicks 'Yes, confirm!', update the state
          setUpdatedData(newData); // Update the state with new data
          setData(newData);
          console.log("Updated Blog:", response.data); // Log the updated response
          Swal.fire("Confirmed!", "Your data has been updated.", "success"); // Show success confirmation
          handleModalUpdate(); // Close the modal
        } else {
          // If user clicks 'Cancel', no further action
          Swal.fire("Cancelled", "Your changes were not saved.", "error");
          handleModalUpdate();
        }
      });
    } catch (error) {
      console.error("Error updating the blog:", error);
      Swal.fire(
        "Error",
        "Something went wrong while updating the blog.",
        "error"
      );
    } finally {
      setLoading(false); // Reset loading state after the update
    }
  };

  //   console.log(updatedBlog);
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
