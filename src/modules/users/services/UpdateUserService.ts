import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';

interface IRequest {
    id: string;
    name: string;
    email: string;
    password: string;
}

class UpdateUserService {
    public async execute({id, name, email, password}: IRequest): Promise<User> {

        const usersRepository = getCustomRepository(UserRepository);

        const user = await usersRepository.findOne(id);

        if (!user){
            throw new AppError('User not found');
        }

        const userExists = await usersRepository.findByName(name);

        if (userExists) {
            throw new AppError('There is already one user with this name');
        }

        user.name = name;
        user.email = email;
        user.password = password;

        await usersRepository.save(user);

        return user;
    }
}

export default UpdateUserService;
