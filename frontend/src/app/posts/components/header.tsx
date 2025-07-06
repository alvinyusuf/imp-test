import { Plus } from "lucide-react"
import Link from "next/link"

export default function PostHeader() {
  return (
    <div className="flex justify-between mb-4">
      <h1 className="text-2xl">List Posts</h1>
      <Link href={`/posts/create`} className="btn btn-primary md:hidden">
        <Plus size={16} /> Add Post
      </Link>
    </div>
  )
}