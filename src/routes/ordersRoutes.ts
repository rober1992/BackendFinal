import { isLoggedIn } from '../middlewares/auth';
import { Router } from 'express';
import { orderController } from '../controllers/ordersController';
import { checkAdmin } from '../middlewares/checkAdm';

const router = Router();

router.get('/', isLoggedIn, orderController.getOrderUser);
router.get('/:id', isLoggedIn, checkAdmin, orderController.getOrderUser);

export default router;