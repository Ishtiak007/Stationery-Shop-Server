import { model, Schema } from 'mongoose';
import { productStatus, productTypes } from './product.constant';
import { TProduct } from './product.interface';

const ProductSchema = new Schema<TProduct>(
  {
    name: { type: String, trim: true, unique: true },
    author: { type: String, trim: true },
    description: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: {
        values: Object.values(productTypes),
        message: 'Needed a product category!',
      },
    },
    price: { type: Number, required: true, min: 0 },
    stockQuantity: { type: Number, required: true, min: 0 },
    brand: { type: String, trim: true },
    color: { type: String, trim: true },
    size: { type: String, trim: true },
    material: { type: String, trim: true },
    sku: { type: String, required: true, unique: true, trim: true },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    isFeatured: { type: Boolean, default: false },
    tags: { type: [String], default: [] },
    productImg: { type: String, default: '' },
    discount: {
      percentage: { type: String },
      validUntil: { type: Date },
    },
    status: {
      type: String,
      required: true,
      default: 'available',
      enum: {
        values: Object.values(productStatus),
        message: 'Needed a product status!',
      },
    },
  },
  {
    timestamps: true,
  },
);

export const ProductModel = model<TProduct>('Product', ProductSchema);
