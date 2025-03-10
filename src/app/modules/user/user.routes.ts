import { Router } from 'express';
import auth from '../../../middlewares/auth';

const router = Router();

router.post('/create-user', UserController.registerUser);

export const UserRoutes = router;
