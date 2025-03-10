import { Router } from 'express';
import auth from '../../../middlewares/auth';
import { UserController } from './user.controller';

const router = Router();

router.post('/create-user', UserController.registerUser);

router.get('/all-users', auth('user', 'admin'), UserController.getAllUser);

export const UserRoutes = router;
