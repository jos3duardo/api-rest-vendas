import { getCustomRepository } from 'typeorm';
import Customer from '../infra/typeorm/entities/Customer';
import CustomerRepository from '../infra/typeorm/repositories/CustomersRepository';
import AppError from '@shared/errors/AppError';
import { IUpdateCustomer } from '@modules/customers/domain/models/IUpdateCustomer';
import { inject, injectable } from 'tsyringe';
import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomerRepository';

@injectable()
class UpdateCustomerService {

    constructor(
        @inject('CustomersRepository')
        private customerRepository: ICustomerRepository
    ) {}
    
    public async execute({ 
        id,
        name,
        email,
    }: IUpdateCustomer): Promise<Customer> {
        
        const customer = await this.customerRepository.findById(id);

        if (!customer) {
            throw new AppError('Customer not found.');
        }
        
        const customerExist = await this.customerRepository.findByEmail(customer.email);
        
        if (customerExist && email !== customer.email) {
            throw new AppError('There is already one customer with this email.');
        }
        
        customer.name = name;
        customer.email = email;
        
        await this.customerRepository.save(customer)
        
        return customer;
    }
}

export default UpdateCustomerService;
