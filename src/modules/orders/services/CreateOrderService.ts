import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import ProductRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '../infra/typeorm/entities/Order';
import OrdersRepository from '../infra/typeorm/repositories/OrdersRepository';
import { IRequestCreateOrder } from '@modules/orders/domain/models/IRequestCreateOrder';
import { inject, injectable } from 'tsyringe';
import { IOrdersRepository } from '@modules/orders/domain/repositories/IOrdersRepository';
import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomerRepository';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { IOrder } from '@modules/orders/domain/models/IOrder';

@injectable()
class CreateOrderService {
    
    constructor(
        @inject('OrdersRepository')
        private ordersRepository: IOrdersRepository,

        @inject('CustomersRepository')
        private customerRepository: ICustomerRepository,
        
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {
    }
    
    public async execute({ customer_id, products }: IRequestCreateOrder): Promise<IOrder> {

        const customerExists = await this.customerRepository.findById(customer_id);

        if (!customerExists) {
            throw new AppError('Could not find any customer with the given id.');
        }

        const existsProducts = await this.productsRepository.findAllByIds(products);

        if (!existsProducts.length) {
            throw new AppError('Could not find any products with the given ids.');
        }

        const existsProductsIds = existsProducts.map(product => product.id);

        const checkInexistentProducts = products.filter(
            product => !existsProductsIds.includes(product.id),
        );

        if (checkInexistentProducts.length) {
            throw new AppError(
                `Could not find product ${checkInexistentProducts[0].id}.`,
            );
        }

        const quantityAvailable = products.filter(
            product =>
                existsProducts.filter(p => p.id === product.id)[0].quantity <
                product.quantity,
        );

        if (quantityAvailable.length) {
            throw new AppError(
                `The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}.`,
            );
        }

        const serializedProducts = products.map(product => ({
            product_id: product.id,
            quantity: product.quantity,
            price: existsProducts.filter(p => p.id === product.id)[0].price,
        }));

        const order = await this.ordersRepository.create({
            customer: customerExists,
            products: serializedProducts,
        });

        const { order_products } = order;

        const updatedProductQuantity = order_products.map(product => ({
            id: product.product_id,
            quantity:
                existsProducts.filter(p => p.id === product.product_id)[0].quantity -
                product.quantity,
        }));

        await this.productsRepository.updateStock(updatedProductQuantity);

        return order;
    }
}

export default CreateOrderService;
