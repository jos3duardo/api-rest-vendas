import "reflect-metadata"
import DeleteCustomerService from '@modules/customers/services/DeleteCustomerService';
import FakerCustomerRepository from '@modules/customers/domain/repositories/fakes/FakerCustomerRepository';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import AppError from '@shared/errors/AppError';

let fakeCustomerRepository: FakerCustomerRepository;
let createCustomer: CreateCustomerService;
let deleteCustomer: DeleteCustomerService;

describe('DeleteCustomer', () => {
    
    beforeEach(() => {
        fakeCustomerRepository = new FakerCustomerRepository();
        createCustomer = new CreateCustomerService(fakeCustomerRepository);
        deleteCustomer = new DeleteCustomerService(fakeCustomerRepository);
    })
    
    it('should be able to delete a customer', async () => {
        const customer = await createCustomer.execute({
            name: 'Jose Eduardo',
            email: 'joseduardo@email.com'
        })

        await deleteCustomer.execute({
            id: customer.id
        })
        
        expect(customer).toHaveProperty('id')
    })

    it('should not be able to delete a customer not found', async () => {
        
        expect(
            deleteCustomer.execute({
                id: '123'
            })
        ).rejects.toBeInstanceOf(AppError)
    })
})
