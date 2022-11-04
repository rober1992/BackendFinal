import { Request, Response, NextFunction } from 'express';
import { productsAPI } from '../apis/productsAPI';
import { ProductQuery } from '../interfaces/productsInterfaces';

class Producto {
    checkAddProduct (err: Error, req: Request, res: Response, next: NextFunction) {

        const { name, price, description, thumbnail, stock } = req.body;

        if (!name || !price || !description || !thumbnail || !stock ||  
            typeof name !== 'string' || 
            typeof description !== 'string' ||
            typeof thumbnail !== 'string' ||
            isNaN(stock) ||
            isNaN(price)) {
        return res.status(400).json({
            msg: 'Campos del body invalidos',
            error : err
        });
        }

        next();
    }

  async checkProductExists(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const producto = await productsAPI.getProducts(id);

    if (!producto) {
      return res.status(404).json({
        msg: 'producto not found',
      });
    }
    next();
  }

  async getProducts(req: Request, res: Response) {
    const { id } = req.params;
    const { nombre, precio } = req.query;
    if (id) {
      const result = await productsAPI.getProducts(id);
      if (result == undefined || result == null)
        return res.status(404).json({
          data: 'objeto no encontrado',
        });

      return res.json({
        data: result,
      });
    } 

    const query: ProductQuery = {};

    if (nombre) query.name = nombre.toString();

    if (precio) query.price = Number(precio);

    if (Object.keys(query).length) {
      return res.json({
        data: await productsAPI.query(query),
      });
    } 

    res.json({
      data : await productsAPI.getProducts(),
    });

    //res.render('main',{ products : await productsAPI.getProducts()} );
  }

  async addProducts(req: Request, res: Response) {
    const newItem = await productsAPI.addProduct(req.body);

    res.json({
      msg: 'producto agregado con exito',
      data: newItem,
    });
  }

  async updateProducts(req: Request, res: Response) {
    const id = req.params.id;

    const updatedItem = await productsAPI.updateProduct(id, req.body);

    res.json({
      msg: 'actualizando producto',
      data: updatedItem,
    });
  }

  async deleteProducts(req: Request, res: Response) {
    const id = req.params.id;
    await productsAPI.deleteProduct(id);
    res.json({
      msg: 'producto borrado',
    });
  }
}

export const productsController = new Producto();