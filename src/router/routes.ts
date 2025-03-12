import express from 'express';
import { UserRoutes } from '../app/modules/user/user.routes';
import { AuthRoutes } from '../app/modules/auth/auth.routes';
import { ProductRoutes } from '../app/modules/products/product.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
