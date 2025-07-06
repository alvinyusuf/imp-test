import { Post } from "@/schemas/posts/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreatePost = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (newPost: Pick<Post, "title" | "content">): Promise<Post> => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newPost,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create post");
      }

      const json = await res.json();
      return json.data as Post;
    },

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
