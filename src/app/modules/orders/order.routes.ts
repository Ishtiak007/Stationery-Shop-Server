import { Router } from 'express';
import auth from '../../../middlewares/auth';

const router = Router();

//create order
router.post('/', auth('admin', 'user'), OrderControllers.createOrder);

export const OrderRoutes = router;
