import { getRepository, In, Repository } from 'typeorm';
import Product from '../entities/Product';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { IFindProducts } from '@modules/products/domain/models/IFindProducts';
import { IProductPaginate } from '@modules/products/domain/models/IProductPaginate';
import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct';
import { IProduct } from '@modules/products/domain/models/IProduct';
import { IUpdateStockProduct } from '@modules/products/domain/models/IUpdateStockProduct';


class ProductRepository implements IProductsRepository{
    private ormRepository: Repository<Product>
    
    constructor() {
        this.ormRepository = getRepository(Product)
    }
    
    public async findByName(name: string): Promise<Product | undefined> {
        return this.ormRepository.findOne({
            where: {
                name,
            },
        });
    }
    
    public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
        const productIds = products.map(product => product.id);
        
        return await this.ormRepository.find({
            where: {
                id: In(productIds)
            }
        });
    }

    public async findAll(): Promise<IProduct[]> {
        return Promise.resolve([]);
    }

    public async findAllPaginate(): Promise<IProductPaginate> {
        const products = await this.ormRepository.createQueryBuilder().paginate();

        return products as IProductPaginate;;
    }

    public async findById(id: string): Promise<IProduct | undefined> {
        return Promise.resolve(undefined);
    }

    public async remove(product: IProduct): Promise<void> {
        return Promise.resolve(undefined);
    }
    
    public async create({ 
        name,
        price,
        quantity
    }: ICreateProduct): Promise<Product> {
        const product = this.ormRepository.create({ name, price, quantity });

        await this.ormRepository.save(product);

        return product;
    }
    
    public async save(product: IProduct): Promise<IProduct> {
        await this.ormRepository.save(product);

        return product;
    }

    public async updateStock(products: IUpdateStockProduct[]): Promise<void> {
        await this.ormRepository.save(products);
    }
}

export default ProductRepository;
