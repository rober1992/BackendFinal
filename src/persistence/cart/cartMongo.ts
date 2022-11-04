import mongoose from 'mongoose';
import { CartI, ProductCart, CartBaseClass } from '../../interfaces/cartInterfaces';
import { NewUserI } from '../../interfaces/usersInterfaces';
import { logger } from '../../middlewares/logger'
import { cartSchema } from '../../models/cartModels';


export class CartsMongo implements CartBaseClass {
    private carts;
  
    constructor() {
      this.carts = mongoose.model<CartI>('cart', cartSchema);
    }
  
    async get(userId: string): Promise<any>{
      const result = await this.carts.findOne({ userId }).lean();
      if (!result) throw new Error('id not found');
      
      return result;
    }
  
    async createCart(user : NewUserI, userId : string): Promise<CartI> {
      const newCart = new this.carts({
        userId : userId,
        products: [],
        street : user.address,
        streetNumber : user.addressNumber,
        codPostal : user.postalCode,
        piso : user.piso,
        state : user.state,
      });
  
      await newCart.save();
  
      return newCart;
    }
  
    productExist(cart: CartI, productId: string): boolean {
      const index = cart.products.findIndex(
        (aProduct) => aProduct._id == productId
      );
  
      if (index < 0) return false;
  
      return true;
    }
  
    async addProduct(cartId: string, product: ProductCart): Promise<CartI> {
      const cart = await this.carts.findById(cartId);
      if (!cart) throw new Error('Cart not found');
  
      const index = cart.products.findIndex(
        (aProduct) => aProduct._id == product._id
      );
  
      if (index < 0) cart.products.push(product);
      else cart.products[index].amount += product.amount;
  
      await cart.save();
  
      return cart;
    }
  
    async deleteProduct(cartId: string, product: ProductCart): Promise<CartI> {
      const cart = await this.carts.findById(cartId);
      if (!cart) throw new Error('Cart not found');
    
      const index = cart.products.findIndex(
        (aProduct) => aProduct._id == product._id
      );
  
      if (index < 0) throw new Error('Product not found');
  
      if (cart.products[index].amount <= product.amount)
        cart.products.splice(index, 1);
      else cart.products[index].amount -= product.amount;
  
      await cart.save();
      return cart;
    }
  
    async deleteAllProducts(cartId : string) {
      const cart = await this.carts.findById(cartId);
      if (!cart) throw new Error('Cart not found');
      cart.products.splice(0, cart.products.length);
      await cart.save();
    }

    async deleteCart(userId : string) {
      await this.carts.findOneAndDelete({userId : userId});
    }
  }