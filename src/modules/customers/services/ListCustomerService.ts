import { ICustomerPaginate } from '@modules/customers/domain/models/ICustomerPaginate';
import { inject, injectable } from 'tsyringe';
import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomerRepository';

@injectable()
class ListCustomerService {
    
    constructor(
        @inject('CustomersRepository')
        private customerRepository: ICustomerRepository
    ) {}
    
    public async execute(): Promise<ICustomerPaginate> {
        
        return await this.customerRepository.findAllPaginate();
    }
}

export default ListCustomerService;
