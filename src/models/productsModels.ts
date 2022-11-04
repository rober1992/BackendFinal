import mongoose from 'mongoose';
import {
  ProductI,
} from '../interfaces/productsInterfaces';


export const productsSchema = new mongoose.Schema<ProductI>({
    name : {type : String, required : true, max : 50},
    price : {type : Number, required : true},
    description : {type : String, required : true, max : 240} ,
    stock : {type : Number, required : true, max : 240} ,
    timestamp : {type : Number, default : Date.now()},
    photos : [{
      photoId : String,
      photoUrl : String
    }]
});

