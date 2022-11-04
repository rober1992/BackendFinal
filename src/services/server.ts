import express from 'express';
import path from 'path';
import * as http from 'http';
import fileupload from 'express-fileupload';
import apiRouter from '../routes/index';
import handlebars from 'express-handlebars';
import session from 'express-session';
import { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import expressHandlebars from 'express-handlebars';
import Handlebars from 'handlebars';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import config from '../config';




export const middlewareSession = session( {
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost:27017/coderhouse'
    }),
    secret: 'asdasasdasfas',
    resave: false,
    saveUninitialized: false,
    cookie : {
        maxAge : 600000
    }
});



const app = express ();


const publicFolderPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicFolderPath));


const layoutsFolderPath = path.resolve(__dirname, '../../views/layouts')
const defaultLayerPth = path.resolve(__dirname, '../../views/layouts/index.hbs');
const partialsFolderPath = path.resolve(__dirname, '../../views/partials');


app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    extname: 'hbs',
    layoutsDir : layoutsFolderPath,
    partialsDir : partialsFolderPath ,
    defaultLayout : defaultLayerPth,
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(cookieParser());
app.use(middlewareSession);

app.use(passport.initialize());
app.use(passport.session());

app.use(
	fileupload({
		useTempFiles: true,
		tempFileDir: '/tmp/',
	})
);


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ecommerce',
      version: '0.0.1',
      description: 'This is a simple CRUD API application made with Express and documented with Swagger',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html'
      },
      contact: {
        name: 'Santino Pinnola',
        url: 'https://github.com/SantinoPinnola',
        email: 'santinopinnola9@gmail.com'
      }
    },
    servers: [
      {
        url: `http://localhost:${config.PORT}`,
        description: 'Development server'
      },
    ]
  },
  apis: ['src/routes/*']
};

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api', apiRouter)

const myServer = new http.Server(app);

export default myServer;



