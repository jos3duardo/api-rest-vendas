import "reflect-metadata"
import FakerCustomerRepository from '@modules/customers/domain/repositories/fakes/FakerCustomerRepository';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import ListCustomerService from "../ListCustomerService";

let fakeCustomerRepository: FakerCustomerRepository;
let createCustomer: CreateCustomerService;
let listCustomer: ListCustomerService;

describe('ListCustomer', () => {
    
    beforeEach(() => {
        fakeCustomerRepository = new FakerCustomerRepository();
        createCustomer = new CreateCustomerService(fakeCustomerRepository);
        listCustomer = new ListCustomerService(fakeCustomerRepository);
    })
    
    it('should be able to list customer', async () => {
        await createCustomer.execute({
            name: 'Jose Eduardo',
            email: 'joseduardo@email.com'
        })

        await createCustomer.execute({
            name: 'Jose Eduardo',
            email: 'joseduardo2@email.com'
        })

        const response = await listCustomer.execute()
        
        expect(response.data).toEqual(2)
    })
})
