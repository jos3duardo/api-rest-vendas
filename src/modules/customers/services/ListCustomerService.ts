import { getCustomRepository } from 'typeorm';
import Customer from '../infra/typeorm/entities/Customer';
import CustomerRepository from '../infra/typeorm/repositories/CustomersRepository';
import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination';

interface IPaginateCustomer {
    from: number;
    to: number;
    per_page: number;
    total: number;
    current_page: number;
    prev_page: number | null;
    next_page: number | null;
    data: Customer[];
}

class ListCustomerService {
    public async execute(): Promise<IPaginateCustomer> {
        const customerRepository = getCustomRepository(CustomerRepository);
        
        const customer = await customerRepository.createQueryBuilder().paginate();

        return customer as IPaginateCustomer;
    }
}

export default ListCustomerService;
