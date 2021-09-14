import AppError from '@shared/errors/AppError';
import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomerRepository';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateCustomerService {
    
    constructor(
        @inject('CustomersRepository')
        private customerRepository: ICustomerRepository
    ) {}
    
    public async execute({ name, email }: ICreateCustomer): Promise<ICustomer> {
        
        const customerExists = await this.customerRepository.findByEmail(email);

        if (customerExists) {
            throw new AppError('Email address is already ready used');
        }
        
        const customer = this.customerRepository.create({
            name,
            email,
        });
        
        return customer;
    }
}

export default CreateCustomerService;
