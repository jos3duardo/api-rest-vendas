import "reflect-metadata"
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import FakerCustomerRepository from '@modules/customers/domain/repositories/fakes/FakerCustomerRepository';
import AppError from '@shared/errors/AppError';
import UpdateCustomerService from "../UpdateCustomerService";

let fakeCustomerRepository: FakerCustomerRepository;
let createCustomer: CreateCustomerService;
let updateCustomer: UpdateCustomerService;

describe('UpdateCustomer', () => {
    
    beforeEach(() => {
        fakeCustomerRepository = new FakerCustomerRepository();
        createCustomer = new CreateCustomerService(fakeCustomerRepository);
        updateCustomer = new UpdateCustomerService(fakeCustomerRepository);
    })
    
    it('should be able to update a customer', async () => {
        
        const customer = await createCustomer.execute({
            name: 'Jose Eduardo',
            email: 'joseduardo@email.com'
        })
        
        const response = await updateCustomer.execute({
            id: customer.id,
            name: 'Eduardo',
            email: 'joseduardo@gmail.com'
        })

        expect(response).toBe('id')
    })

    it('should not be able to update a customer with email in use', async () => {
        
        await createCustomer.execute({
            name: 'Jose Eduardo',
            email: 'email@email.com'
        })

        const customer = await createCustomer.execute({
            name: 'Jose Eduardo',
            email: 'joseduardo@email.com'
        })
        
        const response = await updateCustomer.execute({
            id: customer.id,
            name: 'Eduardo',
            email: 'email@gmail.com'
        })

        expect(customer).toHaveProperty('id')
    })

    it('should not be able to update a customer not found', async () => {
        
        const response = await updateCustomer.execute({
            id: '12312312',
            name: 'Eduardo',
            email: 'joseduardo@gmail.com'
        })

        expect(response).toBe([])
    })
})
