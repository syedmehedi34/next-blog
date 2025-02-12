import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import Swal from "sweetalert2";
import useSecureAxios from "../hooks/useSecureAxios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const FeaturedTable = ({ wishlist }) => {
  const [data, setData] = useState(wishlist);
  const axiosSecure = useSecureAxios();

  const columns = [
    {
      id: "imageAndAuthor",
      header: "Author",
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <img
            src={row.original.authorImage}
            alt="author"
            className="w-12 h-12 object-cover rounded"
          />
          <span className="text-gray-700 dark:text-gray-50">
            {row.original.authorName}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <>
          <button
            onClick={() => {
              handleRemove(row.original._id);
            }}
            className="btn min-h-0 h-7 border-none hover:border-none bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Remove
          </button>
          <Link to={`/blogs/${row.original.blogID}`}>
            <button className="btn btn-outline min-h-0 h-7   px-3 py-1 ml-1 rounded ">
              Details
            </button>
          </Link>
        </>
      ),
    },
  ];

  // * wishlist delete functions
  const handleRemove = (id) => {
    // console.log("wishlist remove button clicked", id);

    // delete operation here
    Swal.fire({
      title: "Are you sure to remove this?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove it!",
    }).then(async (result) => {
      // console.log(result);
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.delete(`/wishlist/${id}`);
          // response handling
          if (response.status === 200) {
            setData(data.filter((item) => item._id !== id));
            // console.log(response.data.message);
            toast.success("Deleted the Post from wishlist", {
              autoClose: 1500,
              position: "top-left",
            });
          }
        } catch (error) {
          // Handle any errors during the DELETE request
          console.error("Error deleting review:", error);
          toast.error("An error occurred while deleting the review", {
            autoClose: 1500,
          });
        }
      }
    });
  };
  //----------------------------------------------//
  // console.log(wishlist);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-6">
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead className="bg-gray-100 dark:bg-gray-800 ">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 text-left text-gray-700 dark:text-gray-50 font-medium"
                    style={
                      index === 0
                        ? { width: "150px" } //  width for the "Image & Author" column
                        : index === 1
                        ? { width: "100px" } //  width for the "Category" column
                        : index === 2
                        ? { width: "350px" } //  width for the "Title" column
                        : { width: "120px" } //  width for the "Actions" column
                    }
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-700 even:bg-gray-800">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-2 text-gray-700 dark:text-gray-50"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeaturedTable;
