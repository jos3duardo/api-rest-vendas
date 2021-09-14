import AppError from '@shared/errors/AppError';
import { IShowUser } from '@modules/users/domain/models/IShowUser';
import { IUser } from '@modules/users/domain/models/IUser';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';

@injectable()
class ShowProfileService {
    
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository
    ) {}
    
    public async execute({ id }: IShowUser): Promise<IUser> {

        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new AppError('User not found.');
        }

        return user;
    }
}

export default ShowProfileService;
