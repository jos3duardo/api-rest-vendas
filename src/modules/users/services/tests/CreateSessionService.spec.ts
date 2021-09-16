import "reflect-metadata"
import FakerUsersRepository from '@modules/users/domain/repositories/fakes/FakerUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateSessionsService from '@modules/users/services/CreateSessionsService';
import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakerUsersRepository;
let createSession: CreateSessionsService
let fakeHasProvider: FakeHashProvider;

describe('CreateSession', () => {
    
    beforeEach(() => {
        fakeUserRepository = new FakerUsersRepository()
        fakeHasProvider = new FakeHashProvider()
        createSession = new CreateSessionsService(fakeUserRepository, fakeHasProvider)
    })
    
    it('should be able to authenticate', async () => {
        const user = await fakeUserRepository.create({
            name: 'Jose Eduardo',
            email: 'joseduardo@email.com',
            password: '123456'
        })
        
        const response = await createSession.execute({
            email: user.email,
            password: '123456'
        })
        
        expect(response).toHaveProperty('token')
        expect(response.user).toEqual(user)
    })

    it('should not be able to authenticate with non existent user', async () => {
        await expect(createSession.execute({
            email: 'joseduardo@email.com',
            password: '123456'
        }),
        ).rejects.toBeInstanceOf(AppError)
    })

    it('should be able to authenticate with wrong password', async () => {
        await fakeUserRepository.create({
            name: 'Jose Eduardo',
            email: 'joseduardo@email.com',
            password: '123456'
        })

        expect(createSession.execute({
                email: 'joseduardo@email.com',
                password: '123123'
            }),
        ).rejects.toBeInstanceOf(AppError)
    })
})
