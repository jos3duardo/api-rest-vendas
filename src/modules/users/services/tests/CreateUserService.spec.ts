import "reflect-metadata"
import CreateUserService from '@modules/users/services/CreateUserService';
import FakerUsersRepository from '@modules/users/domain/repositories/fakes/FakerUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakerUsersRepository;
let createUser: CreateUserService;
let fakeHasProvider: FakeHashProvider;

describe('CreateUser', () => {
    
    beforeEach(() => {
        fakeUserRepository = new FakerUsersRepository();
        fakeHasProvider = new FakeHashProvider()
        createUser = new CreateUserService(fakeUserRepository, fakeHasProvider);
    })
    
    it('should be able to create a new user', async () => {
        
        const user = await createUser.execute({
            name: 'Jose Eduardo',
            email: 'joseduardo@email.com',
            password: '123456'
        })
        
        expect(user).toHaveProperty('id')
    })

    it('should not be able to create two users with the same email', async () => {

        await createUser.execute({
            name: 'Jose Eduardo',
            email: 'joseduardo@email.com',
            password: '123456'
        })

        expect(
            createUser.execute({
                name: 'Jose Eduardo',
                email: 'joseduardo@email.com',
                password: '123456'
            }),
        ).rejects.toBeInstanceOf(AppError)
    })
})
