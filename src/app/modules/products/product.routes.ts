import { NextFunction, Request, Response, Router } from 'express';
import auth from '../../../middlewares/auth';
import { upload } from '../../../utility/sendImageToCloudinary';
import validateRequest from '../../../middlewares/ValidateRequest';
import { ProductValidations } from './product.validation';
import { ProductControllers } from './product.controller';

const router = Router();

//create product
router.post(
  '/create-product',
  auth('admin'),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(ProductValidations.createProductValidation),
  ProductControllers.createProduct,
);

//get all products
router.get('/', ProductControllers.getAllProduct);

//product by Id
router.get('/:productId', ProductControllers.getSingleProduct);

export const ProductRoutes = router;
