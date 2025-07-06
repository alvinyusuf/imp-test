import { Post } from "@/schemas/posts/post"
import { useMemo } from "react"

export const usePostFilter = (posts: Post[], searchTerm: string) => {
  return useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    if (!term) return posts
    return posts.filter((post) => 
      post.title.toLowerCase().includes(term) || 
      post.content.toLowerCase().includes(term)
    )
  }, [posts, searchTerm])
}