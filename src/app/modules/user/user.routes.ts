import { Router } from 'express';
import auth from '../../../middlewares/auth';
import { UserController } from './user.controller';

const router = Router();

router.post('/create-user', UserController.registerUser);

export const UserRoutes = router;
