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

const testimonialsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    location: z.string(),
    text: z.string(),
    rating: z.number().min(1).max(5),
  }),
});

const faqCollection = defineCollection({
  type: 'data',
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    order: z.number().optional().default(0),
  }),
});

export const collections = {
  projekty: projektyCollection,
  testimonials: testimonialsCollection,
  faq: faqCollection,
};
