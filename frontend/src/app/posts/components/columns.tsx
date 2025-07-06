import { createColumnHelper } from "@tanstack/react-table"
import PostActions from "./action"

type Post = {
  id: string
  title: string
  content: string
}

const col = createColumnHelper<Post>()

export const createPostColumns = (handleDelete: (e: React.MouseEvent, id: number) => void) => [
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
]