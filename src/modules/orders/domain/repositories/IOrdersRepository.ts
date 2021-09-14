import { ICreateOrder } from '@modules/orders/domain/models/ICreateOrder';
import { IOrder } from '@modules/orders/domain/models/IOrder';
import { IOrderPaginate } from '@modules/orders/domain/models/IOrderPaginate';

export interface IOrdersRepository {
    findById(id: string): Promise<IOrder | undefined>;
    findAllPaginate(): Promise<IOrderPaginate>;
    create(data: ICreateOrder): Promise<IOrder>;
}
