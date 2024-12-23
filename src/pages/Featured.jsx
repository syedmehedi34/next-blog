import React, { useEffect, useState } from "react";
import useSecureAxios from "../hooks/useSecureAxios";
import FeaturedTable from "../components/FeaturedTable";

const Featured = () => {
  const secureAxios = useSecureAxios();
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    // Fetch featured data
    secureAxios
      .get("/featured")
      .then((res) => {
        const data = res.data;
        if (data) {
          console.log(data);
          setFeatured(data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-11/12 mx-auto mt-7">
      <h1>Featured</h1>
      <div>
        {featured.length === 0 ? (
          <p>No featured items available.</p>
        ) : (
          <FeaturedTable featured={featured} />
        )}
      </div>
    </div>
  );
};

export default Featured;

// const columns = [
//   {
//     accessorKey: "title",
//     header: "Title",
//   },
//   {
//     accessorKey: "image",
//     header: "Image",
//     cell: ({ getValue }) => (
//       <img
//         src={getValue()}
//         alt="Thumbnail"
//         className="w-12 h-12 object-cover rounded"
//       />
//     ),
//   },
//   {
//     accessorKey: "category",
//     header: "Category",
//   },
//   {
//     accessorKey: "authorName",
//     header: "Author",
//   },
//   {
//     id: "actions",
//     header: "Actions",
//     cell: ({ row }) => (
//       <button
//         onClick={() => handleRemove(row.original._id)}
//         className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//       >
//         Remove
//       </button>
//     ),
//   },
// ];

// const handleRemove = (id) => {
//   setData((prev) => prev.filter((item) => item._id !== id));
// };

// const table = useTable({
//   data,
//   columns,
//   getCoreRowModel: () => ({ rows: data }),
// });
