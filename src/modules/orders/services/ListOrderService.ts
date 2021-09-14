import { inject, injectable } from 'tsyringe';
import { IOrdersRepository } from '../domain/repositories/IOrdersRepository';
import { IOrderPaginate } from '../domain/models/IOrderPaginate';

@injectable()
class ListOrderService {
    constructor(
        @inject('OrdersRepository')
        private ordersRepository: IOrdersRepository,
    ) {}

    public async execute(): Promise<IOrderPaginate> {

        return await this.ordersRepository.findAllPaginate();;
    }
}

export default ListOrderService;
