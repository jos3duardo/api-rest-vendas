import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { ICreateOrderProducts } from '@modules/orders/domain/models/ICreateOrderProducts';

export interface IOrder {
    id: string,
    customer: ICustomer,
    order_products: ICreateOrderProducts[],
    created_at: Date,
    updated_at: Date
}
