import { useQuery } from "@tanstack/react-query";
import * as api from "@/api/posts";

export function usePosts(page: number) {
  return useQuery({
    queryKey: ["posts", page],
    queryFn: () => api.fetchPaginatedPosts(page),
    select: meta => meta.data,
    staleTime: 1000 * 60 * 5,
  })
}