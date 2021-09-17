import FakerProductsRepository from '@modules/products/domain/repositories/fakes/FakeProductsRepository';
import CreateProductService from '@modules/products/services/CreateProductService';
import AppError from '@shared/errors/AppError';
import ShowProductService from '@modules/products/services/ShowProductService';
import { response } from 'express';

let fakerProductRepository: FakerProductsRepository;
let createProduct: CreateProductService;
let showProduct: ShowProductService;

describe('ShowProduct', () => {
    beforeEach(() => {
        fakerProductRepository = new FakerProductsRepository()
        createProduct = new CreateProductService(fakerProductRepository)
        showProduct = new ShowProductService(fakerProductRepository)
    })

    it('should be able to show a product', async () => {
        const product = await createProduct.execute({
            name: 'Cubo magico',
            quantity: 2,
            price: 100
        })
        
        const response = await showProduct.execute({
            id:product.id
        })
        
        expect(response).toHaveProperty('id')
    });

    it('should not be able to show a product with an invalid id', async () => {
        expect(
            showProduct.execute({
                id: '123'
            })
        ).rejects.toBeInstanceOf(AppError)
    });
})
