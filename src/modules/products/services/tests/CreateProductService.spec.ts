import FakerProductsRepository from '@modules/products/domain/repositories/fakes/FakeProductsRepository';
import CreateProductService from '@modules/products/services/CreateProductService';

let fakerProductRepository: FakerProductsRepository;
let createProduct: CreateProductService;

describe('CreateProduct', () => {
    beforeEach(() => {
        fakerProductRepository = new FakerProductsRepository()
        createProduct = new CreateProductService(fakerProductRepository)
    })

    it('should be able to create a product', async () => {
        const response = await createProduct.execute({
            name: 'Cubo magico',
            quantity: 10,
            price: 100
        })
        
        expect(response).toHaveProperty('id')
    });
})
