import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import cloudinary from '../services/cloudinary';
import { productsAPI } from '../apis/productsAPI';
import { ProductI } from '../interfaces/productsInterfaces';

class imageController {

    async uploadImage (req : Request, res : Response) {
        try {
           
            if(req.files) {
               
                const id = req.params.id;
                const { tempFilePath } = req.files.thumbnail as UploadedFile;
                console.log(tempFilePath);
                const { secure_url, public_id } = await cloudinary.uploader.upload(
					tempFilePath,
					{ folder: 'samples' }
				);
                console.log('subiendo fotod');
                const product = await productsAPI.getProducts(id) as ProductI[];
                const newArray = [...product[0].photos, {photoId : public_id, photoUrl : secure_url}]
                console.log('the new', newArray);
                const updatedItem = await productsAPI.updateProduct(id, {photos :newArray});
        
                res.status(201).json({
                    msg: 'Imagen añadida con exito!',
                });
                
            }
        }
        catch (error: any) {
            return res.status(400).json({ msg: error.message });
        }
    }

    async getImage (req : Request, res: Response) {
        try {
            if (!req.params.id)
            return res.status(400).json({ msg: 'ingrese un id de producto'})

            const id = req.params.id;
            const product = await productsAPI.getProducts(id) as ProductI[];
            if(!product) {
                return res.status(404).json({ msg: 'id invalido'})
            }

            res.json({
                msg : product[0].photos
            })

        }
        catch (error: any) {
            return res.status(400).json({ msg: error.message });
        }
    }

    async deleteImage (req: Request, res : Response) {
        try {
            if (!req.params.id)
            return res.status(400).json({ msg: 'ingrese un id de imagen'})

            const id = req.params.id;
            const deleted = await cloudinary.uploader.destroy(id);
            
            
            if (deleted.result == 'not found' ) {
                res.status(400).json({msg : 'no se encontro la imagen'});
            } else { 
                res.status(200).json({
                    msg: 'imagen eliminada con exito'
                })
            }
            
        }
        catch (error: any) {
            return res.status(400).json({ msg: error.message });
        }
    }
}

export const imgController = new imageController();