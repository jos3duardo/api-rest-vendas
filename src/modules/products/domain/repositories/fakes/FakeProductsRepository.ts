import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import Product from '@modules/products/infra/typeorm/entities/Product';
import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct';
import { IFindProducts } from '@modules/products/domain/models/IFindProducts';
import { IProductPaginate } from '@modules/products/domain/models/IProductPaginate';
import { IUpdateStockProduct } from '@modules/products/domain/models/IUpdateStockProduct';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { IProduct } from '@modules/products/domain/models/IProduct';

class FakerProductsRepository implements IProductsRepository {
    private products: Product[] = [];

    public async create({ name,price,quantity }: ICreateProduct): Promise<IProduct> {
        const product = new Product()
        
        product.name = name
        product.price = price
        product.quantity = quantity
        
        this.products.push(product)
        
        return product;
    }

    public async findAll(): Promise<IProduct[]> {
        return this.products
    }

    public async findAllByIds(products: IFindProducts[]): Promise<IProduct[]> {
        return this.products
    }

    public async findAllPaginate(): Promise<IProductPaginate> {
        const productsPaginate = {
            from: 1,
            to: 1,
            per_page: 1,
            total: 1,
            current_page: 1,
            prev_page: null,
            next_page: null,
            data: this.products
        }
        return productsPaginate
    }

    public async findById(id: string): Promise<IProduct | undefined> {
        const product = this.products.find(product => product.id === id)
        return product
    }

    public async findByName(name: string): Promise<IProduct | undefined> {
        const product = this.products.find(product => product.name === name)
        return product
    }

    public async remove(product: Product): Promise<void> {}

    public async save(product: Product): Promise<IProduct> {
        const findIndex = this.products.findIndex(findProduct => findProduct.id === product.id)
        this.products[findIndex] = product
        
        return product
    }

    public async updateStock(products: IUpdateStockProduct[]): Promise<void> {}
}

export default FakerProductsRepository
