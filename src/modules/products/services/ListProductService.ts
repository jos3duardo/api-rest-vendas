import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductRepository from '../typeorm/repositories/ProductsRepository';
import RedisCache from '@shared/cache/RedisCache';

class ListProductService {
    public async execute(): Promise<Product[]> {
        
        const productsRepository = getCustomRepository(ProductRepository);

        const redisCache = new RedisCache();
        
        const products = await productsRepository.find();
        
        redisCache.save('teste','teste')
        
        return products; 
    }
}

export default ListProductService;
