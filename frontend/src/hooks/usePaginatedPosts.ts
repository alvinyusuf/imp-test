import { GetPostsResponse } from "@/schemas/posts/post";
import { useQuery } from "@tanstack/react-query";


export const usePaginatedPosts = (page: number) => {
  return useQuery({
    queryKey: ["posts", page],
    queryFn: async (): Promise<GetPostsResponse> => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts?page=${page}`, {
        cache: "no-store",
      });
      const json = await response.json();
      return json.data as GetPostsResponse;
    },
  })
}