import { Post } from "@/types/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdatePayload = {
  id: number;
} & Pick<Post, "title" | "content" | "updatedAt">;

export const useUpdatePost = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...post }: UpdatePayload): Promise<Post> => {
      const res = await fetch(`http://localhost:8000/api/posts/${id}`, {
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
