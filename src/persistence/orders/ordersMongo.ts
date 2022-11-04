import { orderSchema } from "../../models/orderModels";
import { Order, userIdReference } from "../../interfaces/ordersInterfaces";
import  mongoose  from "mongoose";
import { ProductI } from "../../interfaces/productsInterfaces";

class ordersMongo { 
    private orders;

    constructor() {
        this.orders = mongoose.model<Order>('orders', orderSchema);
    }

    async createOrder (userId : userIdReference) {
        const order : Order = {
            userId : userId,
            items : [],
            timestamp : Date.now(),
            status : 'Generado',
            totalPrice : 0,
        }
        
        const newOrder = new this.orders(order);             
        await newOrder.save();
        
        return newOrder._id;
    }

    
    async getOrder (id : string) {
        return this.orders.findById(id);
    }

    async getOrderByUserId (userId : string) {
        return this.orders.find({userId : userId});
    }

    async pushItems ( item : any, orderId: string, totalPrice : number) {
        const orderPushed = await this.orders.findByIdAndUpdate(
            {_id : orderId},
            { $push: { items: item },
            totalPrice : totalPrice },
        )
    }
}

export const orders = new ordersMongo();