import { CartAPI } from '../apis/cartAPI';
import { Request, Response, NextFunction } from 'express';
import { UserI } from '../interfaces/usersInterfaces';
import { productsAPI } from '../apis/productsAPI';
import { orders } from '../persistence/orders/ordersMongo';
import { ProductI } from '../interfaces/productsInterfaces';

class Cart {
  async getCartByUser(req: Request, res: Response) {
    const user: any = req.user;
    const cart = await CartAPI.getCart(user._id);
    res.json(cart);
  }

  async addProduct(req: Request, res: Response) {
    const user: any = req.user;
    const cart = await CartAPI.getCart(user._id);
    const { productId, productAmount } = req.body;

    if (!productId || !productAmount)
      return res.status(400).json({ msg: 'Invalid body parameters' });

      const product = await productsAPI.getProducts(productId);
    if (!product)
      return res.status(400).json({ msg: 'product not found' });

    if (parseInt(productAmount) < 0)
      return res.status(400).json({ msg: 'Invalid amount' });

      const updatedCart = await CartAPI.addProduct(
      cart._id,
      productId,
      parseInt(productAmount)
    );
    //res.redirect('/api/vista');
    res.status(201).json({
      msg: 'Producto agregado con exito',
      updatedCart : updatedCart,
    })
  }

  async deleteProduct(req: Request, res: Response) {
    const user: any = req.user;
    const cart = await CartAPI.getCart(user._id);

    const { productId, productAmount } = req.body;

    if (!productId || !productAmount)
      return res.status(400).json({ msg: 'Invalid body parameters' });

    const product = await productsAPI.getProducts(productId);
    if (!product)
      return res.status(400).json({ msg: 'product not found' });

    if (parseInt(productAmount) < 0)
      return res.status(400).json({ msg: 'Invalid amount' });

    const updatedCart = await CartAPI.deleteProduct(
      cart._id,
      productId,
      parseInt(productAmount)
    );
    res.redirect('/api/userCart');
  }


  async submitCart (req : Request, res : Response) {
      const user : any = req.user;
      const userId = user._id;
      const cart = await CartAPI.getCart(userId);
    
      if(cart.products.length == 0 ) {
        res.status(400).json({msg : 'No hay nigun producto en el carrito'});
      }
      
      const orderId = await orders.createOrder(userId);
    
    
      for (var i = 0; i < cart.products.length ; i++) {
        const result = await productsAPI.getProducts(cart.products[i]._id) as ProductI[];
        console.log ('producto', result)
        console.log('carrrito', cart.products);
      
        const item = {
          productId : result[0]._id,
          amount : cart.products[i].amount,
          price : cart.products[i].price,
        }
    
        const totalPrice = cart.products[i].price * cart.products[i].amount
        await orders.pushItems(item, orderId, totalPrice);
      }
    
      
    
     // await EmailService.sendEmail(config.GMAIL_EMAIL, `Nuevo pedido de ${.username}`, stringOrder);
    await CartAPI.deleteAllProducts(cart._id);
      //res.redirect('/api/vista');
    res.status(201).json({
        msg : 'Orden creada con exito!',
        order : await orders.getOrder(orderId)
    })
  }
}

export const CartController = new Cart();