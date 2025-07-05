import { Post } from "@/types/post";
import { useQuery } from "@tanstack/react-query";

type ApiResponse = {
  message: string;
  data: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    data: Post[];
  }
}

export const usePaginatedPosts = (page: number) => {
  return useQuery({
    queryKey: ["posts", page],
    queryFn: async (): Promise<ApiResponse['data']> => {
      const response = await fetch(`http://localhost:8000/api/posts?page=${page}`, {
        cache: "no-store",
      });
      const json = await response.json();
      return json.data;
    },
  })
}