import { GetPostResponse } from "@/schemas/posts/post";
import { useQuery } from "@tanstack/react-query";

export const usePost = (id: number) => {
  return useQuery({
    queryKey: ["posts", id],
    queryFn: async (): Promise<GetPostResponse> => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${id}`, {
        cache: "no-store",
      });
      const json = await response.json();
      return json.data as GetPostResponse;
    },
  })
}