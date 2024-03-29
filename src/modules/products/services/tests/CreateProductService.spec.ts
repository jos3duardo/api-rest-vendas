import FakerProductsRepository from '@modules/products/domain/repositories/fakes/FakeProductsRepository';
import CreateProductService from '@modules/products/services/CreateProductService';
import AppError from '@shared/errors/AppError';

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
            quantity: 2,
            price: 100
        })
        expect(response).toHaveProperty('id')
    });

    it('should not be able to create two products with the same name', async () => {

        await createProduct.execute({
            name: 'Cubo magico',
            quantity: 2,
            price: 100
        })

        expect(
            createProduct.execute({
                name: 'Cubo magico',
                quantity: 2,
                price: 100
            })
        ).rejects.toBeInstanceOf(AppError)
    })
})
