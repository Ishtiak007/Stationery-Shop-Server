import { z } from 'zod';
import { productStatus, productTypes } from './product.constant';
//validation

const createProductValidation = z.object({
  name: z.string({ required_error: 'Product name required!' }).min(5, {
    message: 'Product name must be at least 5 characters long',
  }),
  author: z
    .string({ required_error: 'Author name required!' })
    .min(3, {
      message: 'Author name must be at least 3 characters long',
    })
    .optional(),
  description: z.string({ required_error: 'Description must be required' }),
  category: z.enum(productTypes as [string, ...string[]], {
    required_error: 'Product category is required',
  }),
  price: z.number({ required_error: 'Product price is required' }).min(0, {
    message: 'Product price must be greater than 0',
  }),
  stockQuantity: z
    .number({ required_error: 'Product quantity is required' })
    .min(0, { message: 'Product quantity must be greater than 0' }),
  brand: z.string().optional(),
  color: z.string().optional(),
  size: z.string().optional(),
  material: z.string().optional(),
  sku: z.string({ required_error: 'Product SKU is required' }),
  rating: z.number({ required_error: 'Rating is required' }),
  isFeatured: z.boolean().default(false),
  tags: z.array(z.string()).optional(),
  productImg: z.string().optional(),
  discount: z
    .object({
      percentage: z.string(),
      validUntil: z
        .string()
        .refine((date) => new Date(date) > new Date(), {
          message: 'Valid until date must be in the future',
        })
        .optional(),
    })
    .optional(),
  status: z.enum(productStatus as [string, ...string[]]).default('available'),
});

const updateProductValidation = createProductValidation.partial();
export const ProductValidations = {
  createProductValidation,
  updateProductValidation,
};
