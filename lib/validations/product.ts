import { z } from "zod";

const dimensionsSchema = z.object({
  width: z.coerce.number().min(0, "Width must be >= 0"),
  height: z.coerce.number().min(0, "Height must be >= 0"),
  depth: z.coerce.number().min(0, "Depth must be >= 0"),
});

const metaSchema = z.object({
  barcode: z.string().min(1, "Barcode is required"),
  qrCode: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string(),
  date: z.string(),
  reviewerName: z.string(),
  reviewerEmail: z.string().email(),
});

export const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().min(0, "Price must be >= 0"),
  discountPercentage: z.coerce.number().min(0).max(100).optional(),
  stock: z.coerce.number().min(0, "Stock must be >= 0"),
  tags: z.array(z.string()).optional(),
  brand: z.string().min(1, "Brand is required"),
  sku: z.string().min(1, "SKU is required"),
  weight: z.coerce.number().min(0, "Weight must be >= 0"),
  category: z.string().min(1, "Category is required"),
  thumbnail: z.string().url("Thumbnail must be a valid URL"),
  images: z.array(z.string().url()).optional(),
  availabilityStatus: z.string().min(1),
  minimumOrderQuantity: z.coerce.number().min(1),
  dimensions: dimensionsSchema,
  warrantyInformation: z.string(),
  shippingInformation: z.string(),
  returnPolicy: z.string(),
  meta: metaSchema,
  reviews: z.array(reviewSchema).optional(),
});

export type Product = z.infer<typeof productSchema> & {
  id?: number;
};
export const productDefaultValues: Product = {
  title: "",
  description: "",
  price: 0,
  discountPercentage: 0,
  stock: 0,
  tags: [],
  brand: "",
  sku: "",
  weight: 0,
  category: "",
  thumbnail: "",
  images: [],
  availabilityStatus: "",
  minimumOrderQuantity: 1,
  dimensions: {
    width: 0,
    height: 0,
    depth: 0,
  },
  warrantyInformation: "",
  shippingInformation: "",
  returnPolicy: "",
  meta: {
    barcode: "",
    qrCode: "",
    createdAt: "",
    updatedAt: "",
  },
  reviews: [],
};
