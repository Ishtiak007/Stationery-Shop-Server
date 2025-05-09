import QueryBuilder from '../../../builder/Querybuilder';
import { sendImageToCloudinary } from '../../../utility/sendImageToCloudinary';
import { stationeryProductSearchableFields } from './product.constant';
import { TProduct } from './product.interface';
import { ProductModel } from './product.model';

// create a product
const createProductIntoDb = async (file: any, payload: TProduct) => {
  if (file) {
    const imageName = `$${payload.name}`;
    const path = file?.path;

    //send image to cloudinary
    const { secure_url } = await sendImageToCloudinary(imageName, path);
    payload.productImg = secure_url as string;
  }
  return await ProductModel.create(payload);
};

// get all product from db
const getAllProductFromDB = async (query: Record<string, unknown>) => {
  const products = new QueryBuilder(ProductModel.find(), query)
    .search(stationeryProductSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await products.modelQuery;
  const meta = await products.countTotal();
  return { result, meta };
};

//single product from db
const getSingleProductFromDB = async (productId: string) => {
  return await ProductModel.findById(productId);
};

// update a product
const updateProductFromDB = async (
  productId: string,
  payload: Partial<TProduct>,
) => {
  return await ProductModel.findByIdAndUpdate(
    productId,
    { $set: payload },
    { new: true, runValidators: true },
  );
};

// delete a product from db
const deleteProduct = async (productId: string) => {
  return await ProductModel.findByIdAndDelete(productId);
};

// product.service.ts
const updateProductWithImageService = async (
  productId: string,
  file: any,
  payload: Partial<TProduct>,
) => {
  if (file) {
    const imageName = `$${payload.name}`;
    const path = file?.path;

    // upload new image to Cloudinary
    const { secure_url } = await sendImageToCloudinary(imageName, path);
    payload.productImg = secure_url as string;
  }

  return await ProductModel.findByIdAndUpdate(
    productId,
    { $set: payload },
    { new: true, runValidators: true },
  );
};

export const productServices = {
  createProductIntoDb,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateProductFromDB,
  deleteProduct,
  updateProductWithImageService,
};
