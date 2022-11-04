import { orders } from "../persistence/orders/ordersMongo";
import { Request , Response} from 'express';


class ordersController {
    async getOrderUser (req : Request, res : Response ) {
        try {
            if(req.params.id) {
                const id = req.params.id
                const orderUser = await orders.getOrderByUserId(id);
                res.json({
                    msg : `Ordenes del usuario ${id}`,
                    data : orderUser
                });
            }
            else {
                if(req.user) {
                    const user: any = req.user;
                    const orderUser = await orders.getOrderByUserId(user._id);
                    res.json({
                        msg : `Ordenes del usuario ${user._id}`,
                        data : orderUser
                    });
                } else {
                    res.status(400).json({
                        msg : 'no estas logeado!'
                    });
                }
            }
        } catch (error: any) {
            return res.status(400).json({ msg: error.message });
        }
    }
}

export const orderController = new ordersController();