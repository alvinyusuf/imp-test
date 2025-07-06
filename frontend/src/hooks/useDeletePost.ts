import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeletePost = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id: number): Promise<void> => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete post");
    },

    onSuccess: (_, id) => {
      qc.invalidateQueries({ queryKey: ["posts"] });
      qc.removeQueries({ queryKey: ["posts", id] });
    },
  });
};
