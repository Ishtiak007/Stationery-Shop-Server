import { Request, Response } from 'express';
import catchAsync from '../../../utility/catchAsync';
import sendResponse from '../../../utility/sendResponse';
import { productServices } from './product.service';
import { ProductModel } from './product.model';
import AppError from '../../../errors/AppError';

const createProduct = catchAsync(async (req, res) => {
  const product = await productServices.createProductIntoDb(req.file, req.body);
  try {
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'product created successfully',
      data: product,
    });
  } catch (err: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: err.message,
      data: [],
    });
  }
});

// get all products
const getAllProduct = catchAsync(async (req, res) => {
  const products = await productServices.getAllProductFromDB(req.query);
  const isHas = products.result.length > 0 ? true : false;
  sendResponse(res, {
    statusCode: isHas ? 200 : 404,
    success: isHas ? true : false,
    message: isHas
      ? 'All products retrieved successfully'
      : 'There is no product available',
    data: isHas ? products : [],
  });
});

// get a single product
const getSingleProduct = catchAsync(async (req, res) => {
  const product = await productServices.getSingleProductFromDB(
    req.params.productId,
  );
  const isHas = product ? true : false;
  sendResponse(res, {
    statusCode: isHas ? 200 : 404,
    success: isHas ? true : false,
    message: isHas
      ? 'product retrieved successfully'
      : ' Product not available',
    data: isHas ? product : [],
  });
});

// Update Product
const updateProduct = catchAsync(async (req, res) => {
  const product = await productServices.updateProductFromDB(
    req.params.productId,
    req.body,
  );
  const isHas = product ? true : false;
  sendResponse(res, {
    statusCode: isHas ? 200 : 404,
    success: isHas ? true : false,
    message: isHas ? 'Product Updated successfully' : ' Product not available',
    data: isHas ? product : [],
  });
});

// delete a product
const deleteProduct = catchAsync(async (req, res) => {
  const deletedProduct = await productServices.deleteProduct(
    req.params.productId,
  );
  const isHas = deletedProduct ? true : false;
  sendResponse(res, {
    statusCode: isHas ? 200 : 404,
    success: isHas ? true : false,
    message: isHas ? 'Product deleted successfully' : ' Product not found',
  });
});

export const ProductControllers = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
