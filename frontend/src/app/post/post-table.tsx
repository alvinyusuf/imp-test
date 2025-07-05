"use client";

import React, { useMemo, useState } from "react";
import { usePosts } from "@/hooks/usePosts";
import { Post } from "@/types/post";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
} from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  // Loader2,
  Search,
  Pencil,
  Trash2,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

const columnHelper = createColumnHelper<Post>();

export default function PostTable() {
  const [page, setPage] = useState(1);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);

  const { posts, error } = usePosts(page);

  const handleEdit = (post: Post) => {
    console.log("Edit:", post);
  };

  const handleDelete = (post: Post) => {
    console.log("Delete:", post);
  };

  const columns = useMemo(() => [
    columnHelper.accessor("title", {
      header: () => (
        <div className="flex items-center gap-1">
          <span>Title</span>
        </div>
      ),
      cell: info => info.getValue(),
    }),
    columnHelper.accessor("content", {
      header: () => (
        <div className="flex items-center gap-1">
          <span>Content</span>
        </div>
      ),
      cell: info => info.getValue(),
    }),
    columnHelper.display({
      id: "actions",
      header: () => <span className="text-center block">Actions</span>,
      cell: info => {
        const post = info.row.original;
        return (
          <div className="flex gap-2 justify-center">
            <button
              aria-label="Edit post"
              className="btn btn-xs btn-square btn-warning"
              onClick={() => handleEdit(post)}
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
            <button
              aria-label="Delete post"
              className="btn btn-xs btn-square btn-error"
              onClick={() => handleDelete(post)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        );
      },
    }),
  ], []);

  const table = useReactTable({
    data: posts ?? [],
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: (row, columnId, filterValue) =>
      row
        .getValue<string>(columnId)
        .toString()
        .toLowerCase()
        .includes(filterValue.toLowerCase()),
  });

  return (
    <div className="card bg-base-100 shadow-xl w-full">
      <div className="card-body p-6 space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Search */}
          <label className="input input-bordered flex items-center w-full sm:max-w-xs">
            <Search className="w-4 h-4 opacity-70" />
            <input
              type="text"
              className="grow"
              placeholder="Search posts…"
              value={globalFilter}
              onChange={e => setGlobalFilter(e.target.value)}
            />
          </label>

          {/* Pagination */}
          <div className="join">
            <button
              className="btn join-item btn-outline"
              onClick={() => setPage(p => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4" /> Prev
            </button>
            <button className="btn join-item no-animation cursor-default">
              Page {page}
            </button>
            <button
              className="btn join-item btn-outline"
              onClick={() => setPage(p => p + 1)}
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table table-zebra table-sm border rounded-box">
            <thead className="bg-base-200">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className="cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-1">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getIsSorted() === "asc" && (
                          <ArrowUp className="w-3 h-3" />
                        )}
                        {header.column.getIsSorted() === "desc" && (
                          <ArrowDown className="w-3 h-3" />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {/* {isPending ? (
                // skeleton loading rows
                [...Array(5)].map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    <td colSpan={columns.length}>
                      <div className="flex items-center justify-center py-4">
                        <Loader2 className="animate-spin w-5 h-5 mr-2" /> Loading…
                      </div>
                    </td>
                  </tr>
                ))
              ) : table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-4">
                    No results found.
                  </td>
                </tr>
              ) : ( */}
              {(
                table.getRowModel().rows.map(row => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Error */}
        {error && (
          <div className="alert alert-error shadow-lg">
            <span>Error fetching data: {error.message}</span>
          </div>
        )}
      </div>
    </div>
  );
}
