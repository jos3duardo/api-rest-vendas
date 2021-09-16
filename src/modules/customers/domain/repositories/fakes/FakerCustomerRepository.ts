import { v4 as uuidv4 } from 'uuid'
import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomerRepository';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomerPaginate } from '@modules/customers/domain/models/ICustomerPaginate';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import { ICustomer } from '../../models/ICustomer';

class FakerCustomerRepository implements ICustomerRepository {
    
    private customers: Customer[] = []

    public async create({name,email}:ICreateCustomer): Promise<Customer> {
        const customer = new Customer()
        
        customer.id = uuidv4();
        customer.name = name;
        customer.email = email;
        
        this.customers.push(customer)
        
        return customer
    }

    public async save(customer: Customer): Promise<Customer> {
        const findIndex = this.customers.findIndex(
            findCustomer => findCustomer.id === customer.id
        );
        
        this.customers[findIndex] = customer;
        
        return customer;
    }
   
    public async findByName(name: string): Promise<Customer | undefined> {
        const customer = this.customers.find(costumer => costumer.name === name)
        return customer;
    }

    public async findById(id: string): Promise<Customer | undefined> {
        const customer = this.customers.find(costumer => costumer.id === id)
        return customer;
    }

    public async findByEmail(email: string): Promise<Customer | undefined> {
        const customer = this.customers.find(costumer => costumer.email === email)
        return customer;
    }

    public async findAll(): Promise<Customer[] | undefined> {
        return undefined
    }

    public async findAllPaginate(): Promise<ICustomerPaginate> {
        const customersPaginate = {
            from: 1,
            to: 1,
            per_page: 1,
            total: 1,
            current_page: 1,
            prev_page: null,
            next_page: null,
            data: this.customers,
        };

        return customersPaginate;
    }

    public async remove(customer: ICustomer): Promise<void> {}
}

export default FakerCustomerRepository
