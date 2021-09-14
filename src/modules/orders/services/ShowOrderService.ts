import AppError from '@shared/errors/AppError';
import OrdersRepository from '../infra/typeorm/repositories/OrdersRepository';
import { IShowOrder } from '@modules/orders/domain/models/IShowOrder';
import { IOrder } from '@modules/orders/domain/models/IOrder';
import { inject, injectable } from 'tsyringe';
import { IOrdersRepository } from '@modules/orders/domain/repositories/IOrdersRepository';

@injectable()
class ShowOrderService {

    constructor(
        @inject('OrdersRepository')
        private ordersRepository: IOrdersRepository,
    ) {}
    
    public async execute({ id }: IShowOrder): Promise<IOrder> {

        const order = await this.ordersRepository.findById(id);

        if (!order) {
            throw new AppError('Order not found.');
        }

        return order;
    }
}

export default ShowOrderService;
