import mongoose from "mongoose";
import {Messages} from '../interfaces/messagesInterfaces'

const messagesCollection = 'messages';

export const MessagesSchema = new mongoose.Schema<Messages>({
    userId : {
        type : String,
        required : true
    } ,
    email : {
        type : String, 
        require : true, 
        max : 64
    },
    msg : {
        type : String, 
        require : true, min : 1
    },
    timestamp : {
        type : Date, 
        default : new Date
    },
})

export const mensajes : any = mongoose.model(messagesCollection, MessagesSchema);