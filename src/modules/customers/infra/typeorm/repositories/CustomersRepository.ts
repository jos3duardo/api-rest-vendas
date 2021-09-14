import { getRepository, Repository } from 'typeorm';
import Customer from '../entities/Customer';
import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomerRepository';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomerPaginate } from '@modules/customers/domain/models/ICustomerPaginate';

class CustomersRepository implements ICustomerRepository {
    private ormRepository: Repository<Customer>
    
    constructor() {
        this.ormRepository = getRepository(Customer);
    }
    
    public async create({name,email}:ICreateCustomer): Promise<Customer> {
        const customer = this.ormRepository.create({name,email});
        
        await this.ormRepository.save(customer);
        
        return customer;
    }

    public async save(customer: Customer): Promise<Customer> {
        await this.ormRepository.save(customer);

        return customer;
    }

    public async remove(customer: Customer): Promise<void> {
        await this.ormRepository.remove(customer);
    }
    
    public async findByName(name: string): Promise<Customer | undefined> {
        return await this.ormRepository.findOne({
            where: {
                name,
            },
        });
    }

    public async findById(id: string): Promise<Customer | undefined> {
        return await this.ormRepository.findOne({
            where: {
                id,
            },
        });
    }

    public async findByEmail(email: string): Promise<Customer | undefined> {
        return await this.ormRepository.findOne({
            where: {
                email,
            },
        });
    }
    
    public async findAll(): Promise<Customer[] | undefined> {
        return await this.ormRepository.find();
    }
    
    public async findAllPaginate(): Promise<ICustomerPaginate> {
        const customers = await this.ormRepository.createQueryBuilder().paginate();

        return customers as ICustomerPaginate;
    }
}

export default CustomersRepository
