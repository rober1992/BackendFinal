import {Router} from 'express';
import productsRouter from './productsRoutes';
import cartRouter from './cartRoutes';
import imageRouter from './imageRoutes'
import UserRouter from './userRoutes'
import ordersRouter from './ordersRoutes';
import chatRouter from './chatRoutes';
import { isLoggedIn } from '../middlewares/auth';


const router = Router();

router.use('/products', productsRouter);
router.use('/cart', cartRouter);
router.use('/', UserRouter);
router.use('/images', imageRouter);
router.use('/orders', ordersRouter);
router.use('/chat', chatRouter )

export default router;