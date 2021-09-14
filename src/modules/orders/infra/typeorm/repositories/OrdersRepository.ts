import { getRepository, Repository } from 'typeorm';
import Order from '../entities/Order';
import { IOrdersRepository } from '@modules/orders/domain/repositories/IOrdersRepository';
import { IOrderPaginate } from '@modules/orders/domain/models/IOrderPaginate';
import { ICreateOrder } from '@modules/orders/domain/models/ICreateOrder';


class OrdersRepository implements IOrdersRepository{
    private ormRepository: Repository<Order>;

    constructor() {
        this.ormRepository = getRepository(Order);
    }
    
    public async findById(id: string): Promise<Order | undefined> {
        return this.ormRepository.findOne(id, {
            relations: ['order_products', 'customer'],
        });
    }

    public async findAllPaginate(): Promise<IOrderPaginate> {
        const orders = await this.ormRepository
            .createQueryBuilder('orders')
            .leftJoinAndSelect('orders.customer', 'customer')
            .leftJoinAndSelect('orders.order_products', 'order_products')
            .paginate();

        return orders as IOrderPaginate;
    }

    public async create({ customer, products }: ICreateOrder): Promise<Order> {
        const order = this.ormRepository.create({
            customer,
            order_products: products,
        });

        await this.ormRepository.save(order);

        return order;
    }
}

export default OrdersRepository;
