import { Post } from "@/types/post";
import { useQuery } from "@tanstack/react-query";

type ApiResponse = {
  message: string;
  data: Post;
}

export const usePost = (id: number) => {
  return useQuery({
    queryKey: ["posts", id],
    queryFn: async (): Promise<ApiResponse['data']> => {
      const response = await fetch(`http://localhost:8000/api/posts/${id}`, {
        cache: "no-store",
      });
      const json = await response.json();
      return json.data;
    },
  })
}