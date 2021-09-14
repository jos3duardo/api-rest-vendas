import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../infra/typeorm/entities/User';
import UserRepository from '../infra/typeorm/repositories/UserRepository';
import { hash } from 'bcryptjs';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({ name, email, password }: IRequest): Promise<User> {
        
        const userRepository = getCustomRepository(UserRepository);
        const userExists = await userRepository.findByEmail(email);

        if (userExists) {
            throw new AppError('Email address is already ready used');
        }

        const hashedPassword = await hash(password, 8);
        
        const user = userRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        await userRepository.save(user);
        
        return user;
    }
}

export default CreateUserService;
