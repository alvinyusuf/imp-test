"use client"

import { useDeletePost } from "@/hooks/useDeletePost"
import { usePaginatedPosts } from "@/hooks/usePaginatedPosts"
import { usePostFilter } from "@/hooks/usePostFilter"
import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useCallback, useState } from "react"
import { createPostColumns } from "./columns"
import Pagination from "./pagination"
import { ErrorState, LoadingState } from "./post-states"
import PostHeader from "./post-header"
import PostSearch from "./post-search"
import PostTable from "./post-table"

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

  const filteredData = usePostFilter(data?.data || [], search)
  const columns = createPostColumns(handleDelete)

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  if (isLoading) return <LoadingState />
  if (isError) return <ErrorState />

  return (
    <div>
      <PostHeader />
      <div className="flex justify-between mb-4">
        <PostSearch value={search} onChange={setSearch} />
      </div>
      <PostTable table={table} />
      <Pagination
        page={page}
        lastPage={data?.last_page || 1}
        onPageChange={setPage}
      />
    </div>
  )
}