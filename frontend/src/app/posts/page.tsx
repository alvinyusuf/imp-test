"use client"

import { useDeletePost } from "@/hooks/useDeletePost"
import { usePaginatedPosts } from "@/hooks/usePaginatedPosts"
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useCallback, useMemo, useState } from "react"

type Post = {
  id: string
  title: string
  content: string
}

const col = createColumnHelper<Post>()

export default function Posts() {
  const [page, setPage] = useState<number>(1)
  const [search, setSearch] = useState<string>("")
  const { data, isLoading, isError } = usePaginatedPosts(page)
  const { mutate: deletePost } = useDeletePost()

  const handleDelete = useCallback((e: React.MouseEvent, id: number) => {
    e.preventDefault()
    deletePost(id, {
      onSuccess: () => {
        console.log(`Post with id ${id} deleted successfully`)
      },
    })
  }, [deletePost])

  const columns = useMemo(() => [
    col.display({
      id: "no",
      header: "No",
      cell: ({ row }) => row.index + 1,
    }),
    col.accessor("title", {
      header: "Title",
      cell: (row) => row.getValue(),
    }),
    col.accessor("content", {
      header: "Content",
      cell: (row) => (
        <span className="block max-w-xs truncate" title={row.getValue()}>
          {row.getValue()}
        </span>
      ),
    }),
    col.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/posts/${row.original.id}`}
            className="btn btn-sm btn-warning"
          >
            Edit
          </Link>
          <button
            onClick={(e) => handleDelete(e, Number(row.original.id))}
            className="btn btn-sm btn-error"
          >
            Delete
          </button>
        </div>
      ),
    }),
  ], [handleDelete])

  const filteredData = useMemo<Post[]>(() => {
    const rows = data?.data || []
    const term = search.trim().toLowerCase()
    if (!term) return rows
    return rows.filter((post) => 
      post.title.toLowerCase().includes(term) || 
      post.content.toLowerCase().includes(term)
    )
  }, [data, search])

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error loading posts</div>
  }

  return (
    <div>
      <h1 className="text-2xl mb-4">List Posts</h1>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search here"
          className="input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link href={`/posts/create`} className="btn btn-primary">
          Add Post
        </Link>
      </div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table table-xs">
          <thead>
              {table.getHeaderGroups().map(hg => (
                <tr key={hg.id}>
                  {hg.headers.map(header => (
                    <th key={header.id}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
          <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-end gap-2 w-full">
        <button
          className="btn btn-sm"
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
        >
          <ChevronLeft size={16} /> Previous
        </button>
        <span>Page {page} of {data?.last_page}</span>
        <button
          className="btn btn-sm"
          onClick={() => setPage((old) => (data && old < data.last_page ? old + 1 : old))}
          disabled={data ? page >= data.last_page : true}
        >
           Next <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}
