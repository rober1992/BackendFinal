import {Router} from 'express';
import { productsController } from "../controllers/productsController";
import { checkAdmin } from '../middlewares/checkAdm';
import { Request, Response} from 'express';
import { isLoggedIn } from '../middlewares/auth';

const router = Router();


router.get('/', productsController.getProducts);

router.get('/:id', productsController.checkProductExists, productsController.getProducts);

router.post('/', isLoggedIn, checkAdmin, productsController.checkAddProduct, productsController.addProducts);

router.put('/update/:id', isLoggedIn, checkAdmin, productsController.checkProductExists, productsController.updateProducts);

router.delete('/delete/:id', isLoggedIn, checkAdmin, productsController.checkProductExists, productsController.deleteProducts);


export default router;



