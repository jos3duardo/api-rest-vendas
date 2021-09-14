import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../infra/typeorm/entities/Customer';
import CustomerRepository from '../infra/typeorm/repositories/CustomersRepository';
import { hash } from 'bcryptjs';

interface IRequest {
    name: string;
    email: string;
}

class CreateCustomerService {
    public async execute({ name, email }: IRequest): Promise<Customer> {
        
        const customersRepository = getCustomRepository(CustomerRepository);
        const customerExists = await customersRepository.findByEmail(email);

        if (customerExists) {
            throw new AppError('Email address is already ready used');
        }
        
        const customer = customersRepository.create({
            name,
            email,
        });

        await customersRepository.save(customer);
        
        return customer;
    }
}

export default CreateCustomerService;
