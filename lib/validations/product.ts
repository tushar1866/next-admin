import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().min(0, "Price is required and must be >= 0"),
  stock: z.coerce.number().min(0, "Stock is required and must be >= 0"),
  brand: z.string().min(1, "Brand is required"),
  category: z.string().min(1, "Category is required"),
  thumbnail: z
    .string()
    .url("Thumbnail must be a valid URL")
    .min(1, "Thumbnail is required"),
});

export type ProductFormSchema = typeof productSchema;
export type ProductFormValues = z.infer<typeof productSchema>;
