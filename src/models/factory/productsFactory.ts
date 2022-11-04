import { ProductsDAOMemory } from '../../persistence/products/productsMemory';
import { ProductsMongoDAO } from '../../persistence/products/productsMongo';

import path from 'path';

export enum TipoPersistencia {
  Memoria = 'MEM',
  FileSystem = 'FS',
  MYSQL = 'MYSQL',
  SQLITE3 = 'SQLITE3',
  LocalMongo = 'LOCAL-MONGO',
  MongoAtlas = 'MONGO-ATLAS',
  Firebase = 'FIREBASE',
}

export class FactoryDAO {

  private static instance : any;


  static get(tipo: TipoPersistencia) {

    if(!this.instance) {
      switch (tipo) {

        case TipoPersistencia.MongoAtlas:
          console.log('RETORNANDO INSTAANCIA CLASE MONGO ATLAS');
          return this.instance = new ProductsMongoDAO();
  
          case TipoPersistencia.Memoria:
          console.log('RETORNANDO INSTANCIA CLASE MEMORIA');
          return this.instance = new ProductsDAOMemory();
  
        default:
          case TipoPersistencia.LocalMongo:
          console.log('RETORNANDO INSTANCIA CLASE MONGO LOCAL');
          return this.instance = new ProductsMongoDAO(true);
      }
    } else {
      return this.instance;
    }
  }
}