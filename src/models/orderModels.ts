import mongoose , { Schema }  from 'mongoose';
import { Order } from '../interfaces/ordersInterfaces';

export const orderSchema = new mongoose.Schema<Order>({
    userId : {
        type : Schema.Types.ObjectId,
        required : true
    },
    items : [
        {
          productId: String,
          amount: Number,
          price : Number
        }, 
      ],
    timestamp : {
        type : Number, 
        default : Date.now()
    },
    status : {
      type : String,
      default : "Generado",
      required : true,
    },
    totalPrice : {
      type : Number,
      required : true,
    }
})