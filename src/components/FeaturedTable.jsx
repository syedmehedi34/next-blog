import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import useSecureAxios from "../hooks/useSecureAxios";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

const FeaturedTable = ({ featured }) => {
  const [data, setData] = useState(featured);
  console.log(featured);
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
          <span className="text-gray-700">{row.original.authorName}</span>
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
        <Link to={`/blogs/${row.original._id}`}>
          <button className="btn btn-outline min-h-0 h-7 ">
            Details
            <span className="-rotate-45">
              <FaArrowRight></FaArrowRight>
            </span>
          </button>
        </Link>
      ),
    },
  ];

  // console.log(featured);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-6">
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 text-left text-gray-700 font-medium"
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
              <tr key={row.id} className="hover:bg-gray-50 even:bg-gray-100">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2 text-gray-700">
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
