import { sendImageToCloudinary } from '../../../utility/sendImageToCloudinary';
import { TProduct } from './product.interface';
import { ProductModel } from './product.model';

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

export const productServices = {
  createProductIntoDb,
};
