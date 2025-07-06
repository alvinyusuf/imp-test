"use client"

import { useDeletePost } from "@/hooks/useDeletePost"
import { usePaginatedPosts } from "@/hooks/usePaginatedPosts"
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { Plus } from "lucide-react"
import Link from "next/link"
import { useCallback, useMemo, useState } from "react"
import PostActions from "./post-action"
import Pagination from "./pagination"

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
      onError: (error: Error) => {
        console.error(`Failed to delete post with id ${id}:`, error.message)
      }
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
        <PostActions
          id={row.original.id}
          onDelete={handleDelete}
        />
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
          <Plus size={16} /> Add Post
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
      <Pagination
        page={page}
        lastPage={data?.last_page || 1}
        onPageChange={setPage}
      />
    </div>
  )
}
