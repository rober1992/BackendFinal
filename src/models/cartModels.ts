import mongoose, { Schema } from 'mongoose';
import { CartI } from '../interfaces/cartInterfaces';


export const cartSchema = new mongoose.Schema<CartI>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  products: [
    {
      _id: Schema.Types.ObjectId,
      amount: Number,
      price: Number,
    },
  ],
  street : {
  type : Schema.Types.String,
  required: true
  },
  streetNumber : {
    type : Schema.Types.Number,
    required : true
  },
  codPostal : {
    type : Schema.Types.Number,
    required : true
  },
  piso : {
    type : Schema.Types.Number,
  },
  state : {
    type : Schema.Types.String,
    required : true
  }
});

