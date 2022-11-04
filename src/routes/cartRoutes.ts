import { Router } from 'express';
import { CartController } from '../controllers/cartController';
import { isLoggedIn } from '../middlewares/auth';
const router = Router();

router.get('/',isLoggedIn,  CartController.getCartByUser);

router.post('/add', isLoggedIn, CartController.addProduct);

router.delete('/delete', isLoggedIn, CartController.deleteProduct);

router.post('/submit', isLoggedIn, CartController.submitCart)


export default router; 