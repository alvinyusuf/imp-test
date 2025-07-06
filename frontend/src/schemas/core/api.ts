import z from "zod";

export const makeApiSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    message: z.string(),
    data: dataSchema,
  });

export type ApiResponse<T> = {
  message: string;
  data: T;
}