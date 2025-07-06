import z from "zod";
import { makeApiSchema } from "../core/api";
import { makePaginationSchema } from "../core/pagination";

export const PostSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Post = z.infer<typeof PostSchema>;

export const GetPostSchema = makeApiSchema(PostSchema);
export type GetPostResponse = z.infer<typeof GetPostSchema>;

export const GetPostsSchema = makeApiSchema(makePaginationSchema(PostSchema));
export type GetPostsResponse = z.infer<typeof GetPostsSchema>;

export type UpdatePayload = {
  id: number;
} & Pick<Post, "title" | "content" | "updatedAt">;