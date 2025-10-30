import { Router } from 'express';
import ProductsController from '../controllers/productsController';

const router = Router();
const productsController = new ProductsController();

router.get('/', productsController.getAllProducts.bind(productsController));
router.get('/:id', productsController.getProductById.bind(productsController));
router.post('/', productsController.createProduct.bind(productsController));
router.put('/:id', productsController.updateProduct.bind(productsController));
router.delete('/:id', productsController.deleteProduct.bind(productsController));

export default router;