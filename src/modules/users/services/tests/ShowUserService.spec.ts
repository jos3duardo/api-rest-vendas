import 'reflect-metadata';
import FakerUsersRepository from '@modules/users/domain/repositories/fakes/FakerUsersRepository';
import ShowUserService from '@modules/users/services/ShowUserService';
import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakerUsersRepository;
let showUser: ShowUserService;

describe('ShowUser', () => {
    
    beforeEach(() => {
        fakeUserRepository = new FakerUsersRepository();
        showUser = new ShowUserService(fakeUserRepository);
    })
    
    it('should be able to show a user', async () => {

        const user = await fakeUserRepository.create({
            name: 'Jose Eduardo',
            email: 'joseduardo@email.com',
            password: '123456'
        })
        let id = String(user.id)
        const response = await showUser.execute({ id })
        
        expect(response).toHaveProperty('email')
        expect(response).toEqual(user)
    })

    it('should not be able to show a user', () => {
        expect(showUser.execute({id: 'qweqeqwe'}),
        ).rejects.toBeInstanceOf(AppError)
    })
})
