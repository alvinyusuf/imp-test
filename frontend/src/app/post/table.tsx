"use client"

import { useMemo, useState } from 'react'
import { usePosts } from '@/hooks/posts'
import { Post } from '@/types/post'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
} from '@tanstack/react-table'
import { ChevronLeft, ChevronRight, Pencil, Trash2 } from 'lucide-react'

const columnHelper = createColumnHelper<Post>()

export default function PostTable() {
  const [page, setPage] = useState(1)
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])

  const { data: posts, isPending, error } = usePosts(page)

  const handleEdit = (post: Post) => {
    console.log('Edit:', post)
  }

  const handleDelete = (post: Post) => {
    console.log('Delete:', post)
  }

  const columns = useMemo(
    () => [
      columnHelper.accessor('title', {
        header: 'Title',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('content', {
        header: 'Content',
        cell: info => info.getValue(),
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: info => {
          const post = info.row.original
          return (
            <div className="flex gap-2">
              <button className="btn btn-sm btn-warning" onClick={() => handleEdit(post)}>
                <Pencil className="h-4 w-4" />
              </button>
              <button className="btn btn-sm btn-error" onClick={() => handleDelete(post)}>
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          )
        },
      }),
    ],
    []
  )

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
    globalFilterFn: (row, columnId, filterValue) => {
      return row.getValue(columnId).toString().toLowerCase().includes(filterValue.toLowerCase())
    },
  })

  if (error) return <div className="text-error">Error fetching data: {error.message}</div>

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search posts..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="input input-bordered w-1/3"
        />
        <div className="flex gap-2">
          <button
            className="btn btn-outline"
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            <ChevronLeft className="h-4 w-4" /> Prev
          </button>
          <button
            className="btn btn-outline"
            onClick={() => setPage(p => p + 1)}
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer hover:underline"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getIsSorted() === 'asc' && ' 🔼'}
                    {header.column.getIsSorted() === 'desc' && ' 🔽'}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {isPending ? (
              <tr><td colSpan={columns.length}>Loading...</td></tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <tr><td colSpan={columns.length}>No results found.</td></tr>
            ) : (
              table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
} 
