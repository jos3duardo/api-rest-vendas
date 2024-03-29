import AppError from '@shared/errors/AppError';
import redisCache from '@shared/cache/RedisCache';
import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { IProduct } from '@modules/products/domain/models/IProduct';
import { IUpdateProduct } from '@modules/products/domain/models/IUpdateProduct';

@injectable()
class UpdateProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}
    
    public async execute({id, name, price, quantity}: IUpdateProduct): Promise<IProduct> {


        const product = await this.productsRepository.findById(id);

        if (!product){
            throw new AppError('Product not found');
        }

        const productExists = await this.productsRepository.findByName(name);

        if (productExists) {
            throw new AppError('There is already one product with this name');
        }
        
        product.name = name;
        product.price = price;
        product.quantity = quantity;
        
        await this.productsRepository.save(product);
        
        return product;
    }
}

export default UpdateProductService;
