import AppError from '../../../errors/AppError';
import { ProductModel } from '../products/product.model';
import { TUser } from '../user/user.interface';
import OrderModel from './order.model';

import statusCode from 'http-status';
import { orderUtils } from './order.utils';

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

//verify payment
const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await OrderModel.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'Pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'Cancelled'
                : '',
      },
    );
  }

  return verifiedPayment;
};

export const OrderServices = {
  createOrder,
  getOrders,
  verifyPayment,
};
