import { Router } from 'express';
import auth from '../../../middlewares/auth';
import { UserController } from './user.controller';

const router = Router();

// register user
router.post('/create-user', UserController.registerUser);

// get me route
router.get('/me', auth('user', 'admin'), UserController.getMe);

// update user
router.patch(
  '/update-profile',
  auth('user', 'admin'),
  UserController.updateProfile,
);

// get all users
router.get('/all-users', auth('user', 'admin'), UserController.getAllUser);

// ban user
router.delete('/:id', UserController.deleteUser);

export const UserRoutes = router;
