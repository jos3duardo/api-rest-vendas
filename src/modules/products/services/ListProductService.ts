import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { IProductPaginate } from '@modules/products/domain/models/IProductPaginate';

@injectable()
class ListProductService {
    
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}
    
    public async execute(): Promise<IProductPaginate> {
        return await this.productsRepository.findAllPaginate();
    }
}

export default ListProductService;
