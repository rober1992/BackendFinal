import { Schema } from 'mongoose';
import { NewUserI } from './usersInterfaces';

export type productReference = Schema.Types.ObjectId | string;

export interface CartI {
  _id: string;
  userId: productReference;
  products: ProductCart[];
  street : String;
  streetNumber : Number;
  codPostal : Number;
  piso? : String;
  state : String;
}

export interface ProductCart {
  _id: string;
  price: number;
  amount: number;
}

export interface CartBaseClass {
  get(id: string): Promise<CartI>;
  createCart(user: NewUserI, userId : string): Promise<CartI>;
  addProduct(cartId: string, product: ProductCart): Promise<CartI>;
  deleteProduct(cartId: string, product: ProductCart): Promise<CartI>;
}