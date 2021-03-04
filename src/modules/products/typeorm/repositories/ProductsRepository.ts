import { EntityRepository, Repository } from 'typeorm';
import Product from '../entities/Product';

@EntityRepository(Product)
class ProductRepository extends Repository<Product> {
    public async findByName(nome: string): Promise<Product | undefined> {
        const produto = this.findOne({
            where: {
                nome,
            },
        });
    }
}

export default ProductRepository;
