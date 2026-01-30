import { defineCollection, z } from 'astro:content';

const projektyCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string().optional(),
    thumbnail: z.string().optional(),
    gallery: z.array(z.string()).optional(),
  }),
});

export const collections = {
  projekty: projektyCollection,
};
