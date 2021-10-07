import "reflect-metadata"
import FakerCustomerRepository from '@modules/customers/domain/repositories/fakes/FakerCustomerRepository';
import AppError from '@shared/errors/AppError';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import ShowCustomerService from "../ShowCustomerService";

let fakeCustomerRepository: FakerCustomerRepository;
let createCustomer: CreateCustomerService;
let showCustomer: ShowCustomerService;

describe('ShowCustomer', () => {
    
    beforeEach(() => {
        fakeCustomerRepository = new FakerCustomerRepository();
        createCustomer = new CreateCustomerService(fakeCustomerRepository);
        showCustomer = new ShowCustomerService(fakeCustomerRepository);
    })
    
    it('should be able to show a customer', async () => {
        const customer = await createCustomer.execute({
            name: 'Jose Eduardo',
            email: 'joseduardo@email.com'
        })

        await showCustomer.execute({
            id: customer.id
        })
        
        expect(customer).toHaveProperty('id')
    })

    it('should not be able to show a customer not found', async () => {
        expect(
            showCustomer.execute({
                id: '123'
            })
        ).rejects.toBeInstanceOf(AppError)
    })
})
