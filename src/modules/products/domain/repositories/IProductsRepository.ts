import { IProduct } from '@modules/products/domain/models/IProduct';
import { IProductPaginate } from '@modules/products/domain/models/IProductPaginate';
import { IFindProducts } from '@modules/products/domain/models/IFindProducts';
import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct';
import { IUpdateStockProduct } from '@modules/products/domain/models/IUpdateStockProduct';

export interface IProductsRepository {
    findByName(name: string): Promise<IProduct | undefined>;
    findById(id: string): Promise<IProduct | undefined>;
    findAll(): Promise<IProduct[]>;
    findAllPaginate(): Promise<IProductPaginate>;
    findAllByIds(products: IFindProducts[]): Promise<IProduct[]>;
    create(data: ICreateProduct): Promise<IProduct>;
    save(product: IProduct): Promise<IProduct>;
    updateStock(products: IUpdateStockProduct[]): Promise<void>;
    remove(product: IProduct): Promise<void>;
}
