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

export const OrderRoutes = router;
