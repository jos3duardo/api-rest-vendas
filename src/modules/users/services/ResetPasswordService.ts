import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { isAfter, addHours } from 'date-fns'
import { hash } from 'bcryptjs';
import UserTokensRepository from '@modules/users/typeorm/repositories/UserTokensRepository';
import UserRepository from '@modules/users/typeorm/repositories/UserRepository';

interface IRequest {
    token: string;
    password: string;
}


class ResetPasswordService {
    public async execute({ token, password }: IRequest): Promise<void> {
        
        const userRepository = getCustomRepository(UserRepository);
        const userTokenRepository = getCustomRepository(UserTokensRepository);
     
        const userToken = await userTokenRepository.findByToken(token);


        if (!userToken){
            throw new AppError('User Token does not exists.')
        }

        
        const user = await userRepository.findByUUID(userToken.user_id)

        console.log(user)

        if (!user){
            throw new AppError('User does not exists.')
        }
        
        const tokeCreatedAt = userToken.created_at;
        const compareDate = addHours(tokeCreatedAt,2);
        
        
        if (isAfter(Date.now(), compareDate)){
            throw new AppError('Token expired.')
        }
        
        user.password = await hash(password, 8)
        
        await userRepository.save(user)
    }
}

export default ResetPasswordService;
