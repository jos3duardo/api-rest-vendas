import AppError from '@shared/errors/AppError';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import { inject, injectable } from 'tsyringe';
import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomerRepository';
import { IDeleteCustomer } from '@modules/customers/domain/models/IDeleteCustomer';

@injectable()
class DeleteCustomerService {

    constructor(
        @inject('CustomersRepository')
        private customerRepository: ICustomerRepository
    ) {}
    
    public async execute({ id }: IDeleteCustomer): Promise<void> {

        const customer = await this.customerRepository.findById(id);

        if (!customer) {
            throw new AppError('Customer not found.');
        }
        
        await this.customerRepository.remove(customer) 
    }
}

export default DeleteCustomerService;
