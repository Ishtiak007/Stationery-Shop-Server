import AppError from '../../../errors/AppError';
import { ProductModel } from '../products/product.model';
import { TUser } from '../user/user.interface';
import OrderModel from './order.model';

import statusCode from 'http-status';

//create
const createOrder = async (
  user: TUser,
  payload: { products: { product: string; quantity: number }[] },
  client_ip: string,
) => {
  if (!payload?.products?.length)
    throw new AppError(statusCode.NOT_ACCEPTABLE, 'Order is not specified');

  const products = payload?.products;
  let totalPrice = 0;
  const productDetails = await Promise.all(
    products.map(async (item) => {
      const product = await ProductModel.findById(item.product);
      if (product) {
        const subtotal = product ? (product.price || 0) * item.quantity : 0;
        totalPrice += subtotal;
        return item;
      }
    }),
  );

  let order = await OrderModel.create({
    user,
    products: productDetails,
    totalPrice,
  });

  // payment integration
  const shurjopayPayload = {
    amount: totalPrice,
    order_id: order._id,
    currency: 'BDT',
    customer_name: user.name,
    customer_address: user.address,
    customer_email: user.email,
    customer_phone: user.phone,
    customer_city: user.city,
    client_ip,
    customer_post_code: user.postalCode,
  };

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);
  if (payment?.transactionStatus) {
    order = await order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }
  return payment.checkout_url;
};

// get all products
const getOrders = async () => {
  const data = await OrderModel.find();
  return data;
};

export const OrderServices = {
  createOrder,
  getOrders,
};
