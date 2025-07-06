import z from "zod";

export const makePaginationSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    current_page: z.number(),
    data: z.array(itemSchema),
    first_page_url: z.string().nullable(),
    from: z.number().nullable(),
    last_page: z.number(),
    last_page_url: z.string(),
    links: z.array(
      z.object({
        url: z.string().nullable(),
        label: z.string(),
        active: z.boolean(),
      })
    ),
    next_page_url: z.string().nullable(),
    per_page: z.number(),
    prev_page_url: z.string().nullable(),
    to: z.number().nullable(),
    total: z.number(),
  });
  