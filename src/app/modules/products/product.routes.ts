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

// product by Id
router.get('/:productId', ProductControllers.getSingleProduct);

// get all products
router.get('/', ProductControllers.getAllProduct);

// product update
router.patch(
  '/:productId',
  auth('admin'),
  validateRequest(ProductValidations.updateProductValidation),
  ProductControllers.updateProduct,
);

// delete a product
router.delete('/:productId', auth('admin'), ProductControllers.deleteProduct);

// product.routes.ts
router.patch(
  '/update-product/:productId',
  auth('admin'),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(ProductValidations.updateProductValidation),
  ProductControllers.updateProductWithImage,
);

export const ProductRoutes = router;
