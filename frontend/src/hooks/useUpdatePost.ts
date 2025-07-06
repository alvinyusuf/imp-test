import { Post, UpdatePayload } from "@/schemas/posts/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdatePost = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...post }: UpdatePayload): Promise<Post> => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });
      if (!res.ok) throw new Error("Failed to update");
      const json = await res.json();
      return json.data as Post;
    },
    onSuccess: (data, variables) => {
      qc.invalidateQueries({ queryKey: ["posts"] });
      qc.setQueryData(["posts", variables.id], data);
    },
  });
};
