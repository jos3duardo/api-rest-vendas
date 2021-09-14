import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../infra/typeorm/entities/Customer';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import { inject, injectable } from 'tsyringe';
import { IShowCustomer } from '@modules/customers/domain/models/IShowCustomer';
import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomerRepository';

@injectable()
class ShowCustomerService {

    constructor(
        @inject('CustomersRepository')
        private customerRepository: ICustomerRepository
    ) {}
    
    public async execute({ id }: IShowCustomer): Promise<Customer> {

        const customer = await this.customerRepository.findById(id);

        if (!customer) {
            throw new AppError('Customer not found.');
        }

        return customer;
    }
}

export default ShowCustomerService;
