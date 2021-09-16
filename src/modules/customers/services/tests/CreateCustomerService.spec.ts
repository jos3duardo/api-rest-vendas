import "reflect-metadata"
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import FakerCustomerRepository from '@modules/customers/domain/repositories/fakes/FakerCustomerRepository';
import AppError from '@shared/errors/AppError';

let fakeCustomerRepository: FakerCustomerRepository;
let createCustomer: CreateCustomerService;

describe('CreateCustomer', () => {
    
    beforeEach(() => {
        fakeCustomerRepository = new FakerCustomerRepository();
        createCustomer = new CreateCustomerService(fakeCustomerRepository);
    })
    
    it('should be able to create a new customer', async () => {
        
        const customer = await createCustomer.execute({
            name: 'Jose Eduardo',
            'email': 'joseduardo@email.com'
        })
        
        expect(customer).toHaveProperty('id')
    })

    it('should not be able to create two customers with the same email', async () => {
       
        await createCustomer.execute({
            name: 'Jose Eduardo',
            'email': 'joseduardo@email.com'
        })

        await expect(
           createCustomer.execute({
                name: 'Jose Eduardo',
                'email': 'joseduardo@email.com',
            }),
        ).rejects.toBeInstanceOf(AppError)
    })
})
