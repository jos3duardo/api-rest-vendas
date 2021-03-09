import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';
import path from 'path';
import uploadsConfig from '@config/uploads';
import fs from 'fs';

interface IRequest {
    user_id: string;
    avatarFilename: string;
}

class UpdateUserAvatarService {
    public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
        
        const userRepository = getCustomRepository(UserRepository);
        const user = await userRepository.findById(user_id);
        
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
        
        user.avatar = avatarFilename;
        
        await userRepository.save(user);
         
        return user;
    }
}

export default UpdateUserAvatarService;
