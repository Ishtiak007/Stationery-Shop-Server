import { Router } from 'express';
import auth from '../../../middlewares/auth';
import { OrderControllers } from './order.controller';

const router = Router();

// verify payment
router.get('/verify', auth('admin', 'user'), OrderControllers.verifyPayment);

//create order
router.post('/', auth('admin', 'user'), OrderControllers.createOrder);

// get product
router.get('/', auth('admin', 'user'), OrderControllers.getAllOrder);

// Route to update order status
router.patch(
  '/:orderId',
  auth('admin', 'user'),
  OrderControllers.updateOrderStatus,
);

// delete
router.delete('/:orderId', OrderControllers.deleteOrder);

export const OrderRoutes = router;
