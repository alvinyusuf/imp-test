import { Plus } from "lucide-react"
import Link from "next/link"

interface PostSearchProps {
  value: string
  onChange: (value: string) => void
}

export default function PostSearch({ value, onChange }: PostSearchProps) {
  return (
    <div className="w-full flex justify-between">
      <input
        type="text"
        placeholder="Search here"
        className="input w-full md:w-1/2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Link href={`/posts/create`} className="hidden md:block">
        <button className="btn btn-primary">
          <Plus size={16} /> Add Post
        </button>
      </Link>
    </div>
  )
}