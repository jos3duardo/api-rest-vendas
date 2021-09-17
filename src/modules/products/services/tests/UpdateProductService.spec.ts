import FakerProductsRepository from '@modules/products/domain/repositories/fakes/FakeProductsRepository';
import CreateProductService from '@modules/products/services/CreateProductService';
import AppError from '@shared/errors/AppError';
import UpdateProductService from '@modules/products/services/UpdateProductService';

let fakerProductRepository: FakerProductsRepository;
let createProduct: CreateProductService;
let updateProduct: UpdateProductService;

describe('UpdateProduct', () => {
    beforeEach(() => {
        fakerProductRepository = new FakerProductsRepository()
        createProduct = new CreateProductService(fakerProductRepository)
        updateProduct = new UpdateProductService(fakerProductRepository)
    })

    it('should be able to show a product', async () => {
        const product = await createProduct.execute({
            name: 'Cubo magico',
            quantity: 2,
            price: 100
        })
        
        const response = await updateProduct.execute({
            id: String(product.id),
            name: 'Cubo magico 5x5',
            price: 150,
            quantity: 2,
        })
        
        expect(response).toHaveProperty('id')
    });

    it('should not be able to create two users with the same email', async () => {

        const product1 = await createProduct.execute({
            name: 'Cubo magico 4x4',
            quantity: 2,
            price: 100
        })
        
        const product2 = await createProduct.execute({
            name: 'Cubo magico',
            quantity: 2,
            price: 100
        })

        expect(
            updateProduct.execute({
                id: String(product2.id),
                name: product1.name,
                price: 150,
                quantity: 2,
            }),
        ).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to edit a product invalid', async () => {
        await createProduct.execute({
            name: 'Cubo magico',
            quantity: 2,
            price: 100
        })

        expect(
            updateProduct.execute({
                id: '123',
                name: 'Cubo magico',
                price: 150,
                quantity: 2,
            }),
        ).rejects.toBeInstanceOf(AppError)
    });
})
