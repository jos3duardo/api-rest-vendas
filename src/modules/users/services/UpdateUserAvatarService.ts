import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../infra/typeorm/repositories/UserRepository';
import path from 'path';
import uploadsConfig from '@config/uploads';
import fs from 'fs';
import { IUpdateUserAvatar } from '@modules/users/domain/models/IUpdateUserAvatar';
import { IUser } from '@modules/users/domain/models/IUser';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';

@injectable()
class UpdateUserAvatarService {

    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository
    ) {}
    
    public async execute({ user_id, avatarFilename }: IUpdateUserAvatar): Promise<IUser> {
        
        const user = await this.userRepository.findById(user_id);
        
        if (!user) {
            throw new AppError('User not found');
        }
        
        if (user.avatar) {
            const userAvatarFilePath = path.join(uploadsConfig.directory, user.avatar)
            const userAvatarFileExist = await fs.promises.stat(userAvatarFilePath)
            
            if (userAvatarFileExist) {
                await fs.promises.unlink(userAvatarFilePath)
            }
        }

        if (avatarFilename != null) {
            user.avatar = avatarFilename;
        }
        
        await this.userRepository.save(user);
         
        return user;
    }
}

export default UpdateUserAvatarService;
