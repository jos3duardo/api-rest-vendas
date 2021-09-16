import 'reflect-metadata';
import FakerUsersRepository from '@modules/users/domain/repositories/fakes/FakerUsersRepository';
import ListUsersService from '@modules/users/services/ListUsersService';
import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakerUsersRepository;
let listUser: ListUsersService;

describe('ListUser', () => {
    
    beforeEach(() => {
        fakeUserRepository = new FakerUsersRepository();
        listUser = new ListUsersService(fakeUserRepository);
    })
    
    it('should be able to list a users', async () => {

        await fakeUserRepository.create({
            name: 'Jose Eduardo',
            email: 'joseduardo@email.com',
            password: '123456'
        })

        const response = await listUser.execute()
        expect(response).toHaveProperty('data')
    })

    it('should be able to list many users', async function() {
        await fakeUserRepository.create({
            name: 'Jose Eduardo',
            email: 'joseduardo@email.com',
            password: '123456'
        })

        await fakeUserRepository.create({
            name: 'Jose Eduardo',
            email: 'joseduardolopes@email.com',
            password: '123456'
        })

        const response = await listUser.execute()
        expect(response).toHaveProperty('data')
        expect(response.data.length).toEqual(2)
    });

})
