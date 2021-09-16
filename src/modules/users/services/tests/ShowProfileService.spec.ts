import 'reflect-metadata';
import FakerUsersRepository from '@modules/users/domain/repositories/fakes/FakerUsersRepository';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakerUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
    
    beforeEach(() => {
        fakeUserRepository = new FakerUsersRepository();
        showProfile = new ShowProfileService(fakeUserRepository);
    })
    
    it('should be able to show a profile', async () => {

        const user = await fakeUserRepository.create({
            name: 'Jose Eduardo',
            email: 'joseduardo@email.com',
            password: '123456'
        })
        let id = String(user.id)
        const response = await showProfile.execute({ id })
        
        expect(response).toHaveProperty('email')
        expect(response).toEqual(user)
    })

    it('should not be able to show a profile', () => {
        expect(showProfile.execute({id: 'qweqeqwe'}),
        ).rejects.toBeInstanceOf(AppError)
    })
})
