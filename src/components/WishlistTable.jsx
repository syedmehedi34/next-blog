import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

const FeaturedTable = ({ wishlist }) => {
  const [data, setData] = useState(wishlist);
  const columns = [
    {
      id: "imageAndAuthor",
      header: "Author",
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <img
            src={row.original.image}
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
        <button
          onClick={() => handleRemove(row.original._id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Remove
        </button>
      ),
    },
  ];

  const handleRemove = (id) => {
    setData((prev) => prev.filter((item) => item._id !== id));
  };

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
                        ? { width: "200px" } // Fixed width for the "Image & Author" column
                        : index === 1
                        ? { width: "150px" } // Fixed width for the "Category" column
                        : index === 2
                        ? { width: "300px" } // Fixed width for the "Title" column
                        : { width: "120px" } // Fixed width for the "Actions" column
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
