import { Request, Response } from 'express';
import ListProductService from '@modules/products/services/ListProductService';
import ShowProductService from '@modules/products/services/ShowProductService';
import CreateProductService from '@modules/products/services/CreateProductService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';
import { container } from 'tsyringe';

export default class ProductsController {
    public async index(request: Request, response: Response): Promise<Response> {
        const listProducts = container.resolve(ListProductService);
        
        const products = await listProducts.execute();
        
        return response.json(products);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        
        const showProducts = container.resolve(ShowProductService);
        console.log(id);
        const product = await showProducts.execute({ id });

        return response.json(product);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { name, price, quantity } = request.body;
        
        const createProduct = container.resolve(CreateProductService);
        
        const product = await createProduct.execute({
            name,
            price,
            quantity,
        });
        
        return response.json(product);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const { name, price, quantity } = request.body;
        const { id } = request.params;

        const updateProduct = container.resolve(UpdateProductService);
        
        const product = await updateProduct.execute({
            id,
            name,
            price,
            quantity,
        });
        
        return response.json(product);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        
        const deleteProduct = container.resolve(DeleteProductService)
        
        await deleteProduct.execute({ id })
        
        return response.json([])
    }
}
