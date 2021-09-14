import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomerPaginate } from '@modules/customers/domain/models/ICustomerPaginate';

export interface ICustomerRepository {
    findAll(): Promise<ICustomer[] | undefined>;
    findAllPaginate(): Promise<ICustomerPaginate>
    findByName(name: string): Promise<ICustomer | undefined>;
    findById(id: string): Promise<ICustomer | undefined>;
    findByEmail(email: string): Promise<ICustomer | undefined>;
    create(data: ICreateCustomer): Promise<ICustomer>;
    save(customer: ICustomer): Promise<ICustomer>;
    remove(customer: ICustomer): Promise<void>
}
