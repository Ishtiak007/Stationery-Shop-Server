import catchAsync from '../../../utility/catchAsync';
import sendResponse from '../../../utility/sendResponse';

const createOrder = catchAsync(async (req, res) => {
  const user = req.user;
  const order = await OrderServices.createOrder(user, req.body, req.ip!);
  const isHas = order ? true : false;
  sendResponse(res, {
    statusCode: isHas ? 200 : 404,
    success: isHas ? true : false,
    message: isHas ? 'Order created successfully' : 'Order confirmed',
    data: isHas ? order : [],
  });
});

export const OrderControllers = {
  createOrder,
};
