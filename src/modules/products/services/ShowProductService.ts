import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IShowProduct } from '@modules/products/domain/models/IShowProduct';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { IProduct } from '@modules/products/domain/models/IProduct';


@injectable()
class ShowProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}
    
    public async execute({ id }: IShowProduct): Promise<IProduct> {
        const product = await this.productsRepository.findById(id);
        if (!product){
            throw new AppError('Product not found')
        }
        
        return product;
    }
}

export default ShowProductService;
