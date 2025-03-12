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

export const productServices = {
  createProductIntoDb,
  getAllProductFromDB,
};
