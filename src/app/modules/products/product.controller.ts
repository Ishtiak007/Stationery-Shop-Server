import catchAsync from '../../../utility/catchAsync';
import sendResponse from '../../../utility/sendResponse';

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
export const ProductControllers = {
  createProduct,
};
