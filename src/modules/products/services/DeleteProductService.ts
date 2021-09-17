import { getCustomRepository } from 'typeorm';
import ProductRepository from '../infra/typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import redisCache from '@shared/cache/RedisCache';
import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { IDeleteProduct } from '@modules/products/domain/models/IDeleteProduct';

interface IRequest {
    id: string;
}

@injectable()
class DeleteProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}
    
    public async execute({ id }: IDeleteProduct): Promise<void> {
        const product = await this.productsRepository.findById(id);

        if (!product) {
            throw new AppError('Product not found.');
        }

        await this.productsRepository.remove(product);
    }
}

export default DeleteProductService;
