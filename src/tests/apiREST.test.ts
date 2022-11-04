import supertest from 'supertest';
import mongoose from 'mongoose';
import {MongoDB} from '../db/mongoDB'
import { productsLocal } from '../models/productsModels'
import myServer from '../services/server';
import MongoMemoryServer from 'mongodb-memory-server-core';
import {expect} from 'chai'

describe('Ejemplos de tests', () => {
    let newMongo: any;
    let request: any;
  
    beforeAll(() => {
      jest
        .spyOn(mongoose, 'createConnection')
        .mockImplementationOnce(() => '123');
  
      newMongo = new MongoDB();
      request = supertest(myServer);
    });


    afterAll(async () => {
        await mongoose.disconnect();
    });

    test('deberia devolver coneccion a mongo falsa', async () => {
        const connection = newMongo.getConnection();
        expect(connection).to.equal('123');
    });
    

    test('deberia crear un producto correctamente', async () => {

        jest.spyOn(productsLocal.productos.prototype, 'save').mockResolvedValueOnce('data');
        const body = { 
                name: 'Squid - Tubes / Tenticles 10/20',
                description:
                  'Nulla facilisi. Aenean sollicitudin sollicitudin magna, non tempus sem.',
                price: 121.7,
                thumbnail: 'https://picsum.photos/300?random=2',
        };
        const response = await request.post('/products').send(body);
    
    
        const product = response.body.usuarioNuevo;
    
        expect(product.name).to.equal(body.name);
      });
})
