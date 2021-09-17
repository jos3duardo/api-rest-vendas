import FakerProductsRepository from '@modules/products/domain/repositories/fakes/FakeProductsRepository';
import CreateProductService from '@modules/products/services/CreateProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';
import ListProductService from '@modules/products/services/ListProductService';
import AppError from '@shared/errors/AppError';

let fakerProductRepository: FakerProductsRepository;
let createProduct: CreateProductService;
let deleteProduct: DeleteProductService;
let listProduct: ListProductService;


describe('DeleteProduct', () => {
    beforeEach(() => {
        fakerProductRepository = new FakerProductsRepository()
        createProduct = new CreateProductService(fakerProductRepository)
        deleteProduct = new DeleteProductService(fakerProductRepository)
        listProduct = new ListProductService(fakerProductRepository);

    })

    it('should be able to delete a product', async () => {
        const product = await createProduct.execute({
            name: 'Cubo magico',
            quantity: 2,
            price: 100
        })
        
        const response = await deleteProduct.execute({
            id: product.id
        })
        
        const allProducts = await listProduct.execute()
        
        expect(
            allProducts.data
        ).toEqual([])
    });

    it('should not be able to delete a product with an invalid id', async () => {
        const product = await createProduct.execute({
            name: 'Cubo magico',
            quantity: 2,
            price: 100
        })

        expect(
            deleteProduct.execute({
                id: '1233123'
            })
        ).rejects.toBeInstanceOf(AppError)
    });
})
