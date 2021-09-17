import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import redisCache from '@shared/cache/RedisCache';
import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct';
import { IProduct } from '@modules/products/domain/models/IProduct';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';

@injectable()
class CreateProductService {

    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}
    
    public async execute({ name, price, quantity }: ICreateProduct): Promise<IProduct> {
        
        const productExists = await this.productsRepository.findByName(name);
        if (productExists) {
            throw new AppError('There is already one product with this name');
        }
        
        try {
            const product = this.productsRepository.create({
                name,
                price,
                quantity,
            });
            
            return product      
        } catch (e) {
            throw new AppError(e.message)
        }
        
    }
}

export default CreateProductService;
