import {Router} from 'express';
import { Request, Response } from 'express';
import passport from '../middlewares/auth';
import { isLoggedIn } from '../middlewares/auth';
import { productsAPI } from '../apis/productsAPI';
import {logger} from '../middlewares/logger';
import { CartAPI } from '../apis/cartAPI';
import { orders } from '../persistence/orders/ordersMongo';
import {EmailService} from '../services/gmail';
import config from '../config';
import { UserAPI } from '../apis/userAPI';
import { ProductI } from '../interfaces/productsInterfaces';
import { checkAdmin } from '../middlewares/checkAdm';
import { UserController } from '../controllers/usersController';
const router = Router();


router.get('/', async (req, res) => {
  if (req.isAuthenticated()) { 
    res.redirect('/api/vista');
  }
    res.render('loginForm');
});

router.get('/userGet', isLoggedIn, UserController.getUsers)
router.get('/userGet/:id', isLoggedIn, checkAdmin, UserController.getUsers)


router.post('/login', passport.authenticate('login'), (req : Request, res : Response) => {
  res.redirect('/api/vista');
  //res.status(201).json({
   //msg : 'Logeado con exito'
  //});
});

router.post('/signup', (req, res, next) => {
    passport.authenticate('signup', function (err, user, info) {
      console.log(err, user, info);
      if (err) {
        return next(err);
      }
      if (!user) return res.status(401).json({ data: info });
      
      res.status(201).json({ 
        msg : 'Registrado con exito!',
        userData : user
      })
    })(req, res, next);
});

router.get('/signUpPage', (req: Request, res: Response) => {
    res.render('signup');
})

router.get('/vista', isLoggedIn,  async (req : Request, res: Response) => {
  const result = await productsAPI.getProducts();
  const user : any = req.user;
  const userObject = {
    username : user.username,
    email : user.email,
  }
  res.render('main', {
    user : userObject,
    products : result
  })
})


router.post('/logout', (req: Request, res: Response) => {
  req.session.destroy((err: any) => {
      res.redirect('/api');
  });
})

router.get('/cartView', async (req: Request, res : Response) => {
  const user : any = req.user;
  const userId = user._id;
  const cart = await CartAPI.getCart(userId);

  let array : Array<any> = await Promise.all(cart.products.map(async (element : any) => {
    const result = await productsAPI.getProducts(element._id) as ProductI[];
 
    const cartView = {
      product : result[0].name,
      price : result[0].price,
      amount : element.amount
    }
 
    return cartView;
  }));

  //res.render('cartView', {
  //  products : array
  //})
  res.json({
    msg : `Carrito del usuario ${userId}`,
    cart : array
  });
})

router.post('/update', async (req : Request, res: Response) => {
  const {data} = req.body
  const user : any = req.user
  await UserAPI.updateUser(user._id, data);
  res.redirect('/api/vista');
})


export default router;
