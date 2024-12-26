// import Swal from "sweetalert2";
// import useSecureAxios from "../hooks/useSecureAxios";
// import { useContext, useEffect } from "react";
// import { Link, useNavigation, useParams } from "react-router-dom";
// import { DetailContext } from "../providers/BlogDetailsProvider";
// import { IoArrowBackCircle } from "react-icons/io5";

// const UpdateBlog = () => {
//   const { post, setPost } = useContext(DetailContext);
//   const secureAxios = useSecureAxios();
//   const navigate = useNavigation();

//   const params = useParams();
//   const id = params.id;

//   useEffect(() => {
//     secureAxios
//       .get(`/blogs/${id}`)
//       .then((res) => {
//         console.log(res.data);
//         setPost(res.data);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   }, [id, secureAxios, setPost]);

//   const {
//     title,
//     image,
//     category,
//     short_description,
//     long_description,
//     authorName,
//     authorImage,
//     authorEmail,
//   } = post || {};

//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     // Show confirmation modal
//     const confirmation = await Swal.fire({
//       title: "Are you sure?",
//       text: "Do you want to update this blog post?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, update it!",
//     });

//     if (!confirmation.isConfirmed) {
//       // If user cancels, do nothing
//       return;
//     }

//     const submissionTime = new Date().toLocaleString();
//     const form = e.target;
//     const title = form.title.value;
//     const image = form.image.value;
//     const category = form.category.value;
//     const short_description = form.shortDescription.value;
//     const long_description = form.longDescription.value;

//     const newData = {
//       title,
//       image,
//       category,
//       short_description,
//       long_description,
//       authorName,
//       authorImage,
//       authorEmail,
//       submissionTime,
//     };

//     try {
//       const response = await secureAxios.patch(`/blogs/${id}`, newData);

//       setPost(newData);
//       console.log("Updated Blog:", response.data);
//       Swal.fire("Confirmed!", "Your Blog has been updated.", "success");
//       navigate(-1);
//     } catch (error) {
//       console.error("Error updating the blog:", error);
//       Swal.fire(
//         "Error",
//         "Something went wrong while updating the blog.",
//         "error"
//       );
//     }
//   };

//   return (
//     <div className="py-12 flex items-center justify-center bg-gray-100 ">
//       <div className="relative max-w-2xl w-full bg-white shadow-xl rounded-lg p-8 ">
//         <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
//           Update Your Post
//         </h2>
//         <form onSubmit={handleUpdate}>
//           <div className="space-y-4">
//             {/* Title Input */}
//             <div>
//               <label htmlFor="title" className="block text-gray-600">
//                 Title
//               </label>
//               <input
//                 defaultValue={title}
//                 name="title"
//                 type="text"
//                 id="title"
//                 placeholder="Enter blog title"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             {/* Image URL Input */}
//             <div>
//               <label htmlFor="imageUrl" className="block text-gray-600">
//                 Image URL
//               </label>
//               <input
//                 defaultValue={image}
//                 name="image"
//                 type="url"
//                 id="imageUrl"
//                 placeholder="Enter image URL"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             {/* Category Dropdown */}
//             <div>
//               <label htmlFor="category" className="block text-gray-600">
//                 Category
//               </label>
//               <select
//                 value={category}
//                 name="category"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               >
//                 <option value="">Select Category</option>
//                 <option value="Technology">Technology</option>
//                 <option value="Lifestyle">Lifestyle</option>
//                 <option value="Business">Business</option>
//                 <option value="Health">Health</option>
//               </select>
//             </div>

//             {/* Short Description */}
//             <div>
//               <label htmlFor="shortDesc" className="block text-gray-600">
//                 Short Description
//               </label>
//               <textarea
//                 defaultValue={short_description}
//                 name="shortDescription"
//                 id="shortDesc"
//                 placeholder="Enter short description"
//                 rows="3"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             {/* Long Description */}
//             <div>
//               <label htmlFor="longDesc" className="block text-gray-600">
//                 Long Description
//               </label>
//               <textarea
//                 defaultValue={long_description}
//                 name="longDescription"
//                 id="longDesc"
//                 placeholder="Enter long description"
//                 rows="5"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             {/* Button Section */}
//             <div className="flex justify-between items-center">
//               <div className="flex gap-2">
//                 {/* Submit Button */}
//                 <button type="submit" className="btn btn-primary py-3 w-fit">
//                   Update Post
//                 </button>
//                 {/* Cancel Button */}
//                 <button type="button" className="btn btn-outline py-3 w-fit">
//                   Cancel
//                 </button>
//               </div>

//               {/* Delete Button */}
//               <div>
//                 <button
//                   type="button"
//                   className="btn bg-red-500 text-white hover:bg-red-700 py-3 w-fit"
//                 >
//                   Delete Post
//                 </button>
//               </div>
//             </div>
//           </div>
//         </form>

//         {/* Close Button */}
//         <div className="absolute top-5 left-5">
//           <Link to={-1}>
//             <button className="text-gray-600 btn bg-white hover:bg-white shadow-none border-none">
//               <IoArrowBackCircle size={27} />
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateBlog;
import Swal from "sweetalert2";
import useSecureAxios from "../hooks/useSecureAxios";
import { useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DetailContext } from "../providers/BlogDetailsProvider";
import { IoArrowBackCircle } from "react-icons/io5";

const UpdateBlog = () => {
  const { post, setPost } = useContext(DetailContext);
  const secureAxios = useSecureAxios();
  const navigate = useNavigate();

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    secureAxios
      .get(`/blogs/${id}`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id, secureAxios, setPost]);

  const {
    title,
    image,
    category,
    short_description,
    long_description,
    authorName,
    authorImage,
    authorEmail,
  } = post || {};

  const handleUpdate = async (e) => {
    e.preventDefault();

    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update this blog post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    });

    if (!confirmation.isConfirmed) {
      return;
    }

    const submissionTime = new Date().toLocaleString();
    const form = e.target;
    const title = form.title.value;
    const image = form.image.value;
    const category = form.category.value;
    const short_description = form.shortDescription.value;
    const long_description = form.longDescription.value;

    const newData = {
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

    try {
      const response = await secureAxios.patch(`/blogs/${id}`, newData);
      setPost(newData);
      Swal.fire("Success!", "Your blog has been updated.", "success");
      navigate(-1);
    } catch (error) {
      console.error("Error updating the blog:", error);
      Swal.fire("Error", "Failed to update the blog.", "error");
    }
  };

  const handleDelete = async () => {
    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the blog post.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirmation.isConfirmed) {
      return;
    }

    try {
      await secureAxios.delete(`/blogs/${id}`);
      Swal.fire("Deleted!", "Your blog has been deleted.", "success");
      navigate("/all_blogs");
    } catch (error) {
      console.error("Error deleting the blog:", error);
      Swal.fire("Error", "Failed to delete the blog.", "error");
    }
  };

  return (
    <div className="py-12 flex items-center justify-center bg-gray-100">
      <div className="relative max-w-2xl w-full bg-white shadow-xl rounded-lg p-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Update Your Post
        </h2>
        <form onSubmit={handleUpdate}>
          <div className="space-y-4">
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
            <div>
              <label htmlFor="category" className="block text-gray-600">
                Category
              </label>
              <select
                defaultValue={category}
                name="category"
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
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <button type="submit" className="btn btn-primary py-3 w-fit">
                  Update Post
                </button>
                <button
                  type="button"
                  className="btn btn-outline py-3 w-fit"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>
              </div>
              <button
                type="button"
                className="btn bg-red-500 text-white hover:bg-red-700 py-3 w-fit"
                onClick={handleDelete}
              >
                Delete Post
              </button>
            </div>
          </div>
        </form>
        <div className="absolute top-5 left-5">
          <Link to={-1}>
            <button className="text-gray-600 btn bg-white hover:bg-white shadow-none border-none">
              <IoArrowBackCircle size={27} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlog;
