import mongoose from 'mongoose';
import {
  newProductI,
  ProductI,
  ProductQuery,
} from '../../interfaces/productsInterfaces';
import config from '../../config/index';
import { productsSchema } from '../../models/productsModels';


export class ProductsMongoDAO {
    private srv: string;
    private productos;
  
    constructor(local: boolean = false) {
      if (local)
        this.srv = `mongodb://localhost:27017/${config.MONGO_LOCAL_DBNAME}`;
      else
        this.srv = `mongodb+srv://${config.MONGO_ATLAS_USER}:${config.MONGO_ATLAS_PASSWORD}@${config.MONGO_ATLAS_CLUSTER}/${config.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`;
      mongoose.connect(this.srv);
      this.productos = mongoose.model<ProductI>('producto', productsSchema);
    }
  
    async get(id?: string): Promise<ProductI[]> {
      let output: ProductI[] = [];
      try {
        if (id) {
          const document = await this.productos.findById(id);
          if (document) output.push(document);
        } else {
          output = await this.productos.find();
        }
  
        return output;
      } catch (err) {
        return output;
      }
    }
  
    async add(data: newProductI): Promise<ProductI> {
      if (!data.name || !data.price || !data.description || !data.stock) throw new Error('invalid data');
  
      const newProduct = new this.productos(data);
      await newProduct.save();
  
      return newProduct;
    }
  
    async update(id: string, newProductData : any) {
      return this.productos.findByIdAndUpdate(id, newProductData);
    }
  
    async delete(id: string) {
      await this.productos.findByIdAndDelete(id);
    }
  
    async query(options: ProductQuery): Promise<ProductI[]> {
      let query: ProductQuery = {};
  
      if (options.name) query.name = options.name;
  
      if (options._id) query._id = options._id;
  
      if (options.priceMin) return this.productos.find().where('price').gte(options.priceMin);
      if (options.priceMax) return this.productos.find().where('price').lte(options.priceMax);
      if(options.priceMin && options.priceMax) return this.productos.find({ "price": {$gt : options.priceMin, $lt : options.priceMax}});
  
  
      if(options.stockMin) return this.productos.find().where('stock').gte(options.stockMin);
      if(options.stockMax) return this.productos.find().where('stock').lte(options.stockMax);
      if(options.stockMin && options.stockMax) return this.productos.find({ "stock": {$gt : options.stockMin, $lt : options.stockMax}});
  
      return this.productos.find(query);
    }

  }