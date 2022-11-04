import { CartsMongo } from '../persistence/cart/cartMongo';
import { CartI } from '../interfaces/cartInterfaces';
import { UserAPI } from './userAPI';
import { ProductI } from '../interfaces/productsInterfaces';
import { productsAPI } from './productsAPI'
import { NewUserI } from '../interfaces/usersInterfaces';
import { logger } from '../middlewares/logger';

class Cart {
  private carts;

  constructor() {
    this.carts = new CartsMongo();
  }

  async getCart(userId: string): Promise<CartI> {
    return this.carts.get(userId);
  }

  async createCart(newUser : NewUserI, userId : string): Promise<CartI> {
  
    const newCart = await this.carts.createCart(newUser, userId);
    return newCart;
  }

  async addProduct(
    cartId: string,
    productId: any,
    amount: number
  ): Promise<CartI> { 
    const product =  await productsAPI.getProducts(productId) as unknown as ProductI[]
    const addProduct = {
      _id: productId,
      price: product[0].price,
      amount,
    };
    const updatedCart = await this.carts.addProduct(cartId, addProduct);
    return updatedCart;
  }

  async deleteProduct(cartId: string, productId: string, amount: number) {
    const product = await productsAPI.getProducts(productId) as ProductI;
    const deleteProduct = {
      _id: productId,
      price: product.price,
      amount,
    };

    const updatedCart = await this.carts.deleteProduct(cartId, deleteProduct);
    return updatedCart;
  }

  async deleteAllProducts (cartId : string) {
    await this.carts.deleteAllProducts(cartId);
  }

  async deleteCart (userId : string) {
    await this.carts.deleteCart(userId);
  }
  
}

export const CartAPI = new Cart();