import 'reflect-metadata';
import FakerUsersRepository from '@modules/users/domain/repositories/fakes/FakerUsersRepository';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakerUsersRepository;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
    
    beforeEach(() => {
        fakeUserRepository = new FakerUsersRepository();
        updateProfile = new UpdateProfileService(fakeUserRepository);
    })
    
    it('should be able to update a profile', async () => {

        const user = await fakeUserRepository.create({
            name: 'Jose Eduardo',
            email: 'joseduardo@email.com',
            password: '123456'
        })
        
        const response = await updateProfile.execute({ 
            user_id: String(user.id),
            name: 'Edurdo',
            email: 'joseduardo@email.com',
        })
        
        expect(response).toHaveProperty('email')
        expect(response).toEqual(user)
    })

    it('should not be able to show a profile not found', () => {
        expect(updateProfile.execute({
            user_id: 'qweqweqw',
            name: 'Edurdo',
            email: 'joseduardo@email.com',
            }),
        ).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to edit a profile with email already in use', async () => {
        const user1 = await fakeUserRepository.create({
            name: 'Jose Eduardo',
            email: 'joseduardo@email.com',
            password: '123456'
        })
        
        const user2 = await fakeUserRepository.create({
            name: 'Jose Eduardo',
            email: 'joseduardolopes@email.com',
            password: '123456'
        })
        
        expect(
            updateProfile.execute({
                user_id: user1.id,
                name: 'Eduardo',
                email: 'joseduardolopes@email.com',
            }),
        ).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to edit a profile without an old password', async () => {
        const user = await fakeUserRepository.create({
            name: 'Jose Eduardo',
            email: 'joseduardo@email.com',
            password: '123456'
        })

        expect(updateProfile.execute({
            user_id: String(user.id),
            name: 'Edurdo',
            email: 'joseduardo@email.com',
            password: '45678'
        }),
        ).rejects.toBeInstanceOf(AppError)
    })
    
    it('should not be able to edit a profile without an old password does not match', async () => {
        const user = await fakeUserRepository.create({
            name: 'Jose Eduardo',
            email: 'joseduardo@email.com',
            password: '123456'
        })

        expect(updateProfile.execute({
            user_id: String(user.id),
            name: 'Edurdo',
            email: 'joseduardo@email.com',
            password: '456789',
            old_password: '456789'
        }),
        ).rejects.toBeInstanceOf(AppError)
    })
})
