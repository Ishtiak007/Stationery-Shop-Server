import { Request, Response } from 'express';
import catchAsync from '../../../utility/catchAsync';
import sendResponse from '../../../utility/sendResponse';
import {
  deleteOrderFromDB,
  OrderServices,
  updateOrderStatusService,
} from './order.service';
import statusCode from 'http-status';

// create order
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

// get all order
const getAllOrder = catchAsync(async (req, res) => {
  const orders = await OrderServices.getOrders();
  const isHas = orders ? true : false;
  sendResponse(res, {
    statusCode: isHas ? 200 : 404,
    success: isHas ? true : false,
    message: isHas
      ? 'All Orders retrieved successfully'
      : 'There is no order available',
    data: isHas ? orders : [],
  });
});

//verify payment
const verifyPayment = catchAsync(async (req, res) => {
  const order = await OrderServices.verifyPayment(req.query.order_id as string);

  sendResponse(res, {
    success: true,
    message: 'Order retrieve successfully!',
    statusCode: 200,
    data: order,
  });
});

const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const { orderId } = req.params; // Retrieve orderId from route params
  const { status } = req.body; // Get the status from request body

  // Call the service to update the order status
  const updatedOrder = await updateOrderStatusService(orderId, status);

  // Send the response back to the client
  sendResponse(res, {
    statusCode: statusCode.OK,
    success: true,
    message: 'Order status updated successfully',
    data: updatedOrder,
  });
});

// delete order
const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const { orderId } = req.params; // Retrieve the order ID from params

  const result = await deleteOrderFromDB(orderId); // Call the service to delete the order

  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Order not found!',
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order deleted successfully',
  });
});

export const OrderControllers = {
  createOrder,
  getAllOrder,
  verifyPayment,
  updateOrderStatus,
  deleteOrder,
};
