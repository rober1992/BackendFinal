import { mensajes } from "../models/messagesModels";
import { Server } from "socket.io";
import config from "../config";
import { isLoggedIn } from "../middlewares/auth";
import { middlewareSession } from "./server";
import passport from "../middlewares/auth";




export const initWsServer = (app : any) => {
    const myWSServer = new Server(app);

    const wrap = (middleware : any) => (socket : any, next : any) => middleware(socket.request, {}, next);

    myWSServer.use(wrap(middlewareSession));
    myWSServer.use(wrap(passport.initialize()));
    myWSServer.use(wrap(passport.session()));


    myWSServer.use((socket: any, next) => {
		if (socket.request.user) {
            console.log("nexteo")
            console.log(socket.request.user)
			next();
		} else {
			next(new Error('not logged'));
		}
	});
    
    myWSServer.on('connection', function (socket : any) {
        console.log('\n\nUn cliente se ha conectado');

        
        socket.on('askData', async () => {
            const messages = await mensajes.find().lean();
            if (messages.length > 0) {
                socket.emit('messages', messages);
            }
        });

        socket.on('new-message', async (data : any) => {
            const mensaje = {
                userId : socket.request.user._id,
                email : socket.request.user.email,
                msg : data.msg
            }
            const newMsg = await mensajes.create(mensaje);
            myWSServer.emit('messages', [newMsg]);
        });
        
    })

    
    
    return myWSServer;
}

