import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IUser } from '@modules/users/domain/models/IUser';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { IHashProvider } from '@modules/users/providers/HashProvider/models/IHashProvider';

@injectable()
class CreateUserService {
    
    constructor(
       @inject('UserRepository')
       private userRepository: IUserRepository,

       @inject('HashProvider')
       private hashProvider: IHashProvider
    ) {}
    
    public async execute({ name, email, password }: ICreateUser): Promise<IUser> {
        
        const userExists = await this.userRepository.findByEmail(email);

        if (userExists) {
            throw new AppError('Email address is already ready used');
        }
        const hashedPassword = await this.hashProvider.generateHash(password);
        
        try {
            return await this.userRepository.create({
                name,
                email,
                password: hashedPassword,
            });
        } catch (e) {
            throw new AppError(e.merge);
        }
    }
}

export default CreateUserService;
