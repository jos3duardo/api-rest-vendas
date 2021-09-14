import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { isAfter, addHours } from 'date-fns'
import { hash } from 'bcryptjs';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import { IResetPassword } from '@modules/users/domain/models/IResetPassword';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { IUserTokenRepository } from '@modules/users/domain/repositories/IUserTokenRepository';

@injectable()
class ResetPasswordService {
    
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,

        @inject('UserTokensRepository')
        private userTokenRepository: IUserTokenRepository,
    ) {}
    
    public async execute({ token, password }: IResetPassword): Promise<void> {
     
        const userToken = await this.userTokenRepository.findByToken(token);

        if (!userToken){
            throw new AppError('User Token does not exists.')
        }
        
        const user = await this.userRepository.findById(userToken.user_id)

        if (!user){
            throw new AppError('User does not exists.')
        }
        const tokeCreatedAt = userToken.created_at;
        const compareDate = addHours(tokeCreatedAt,2);
        
        if (isAfter(Date.now(), compareDate)){
            throw new AppError('Token expired.')
        }
        
        user.password = await hash(password, 8)
        
        await this.userRepository.save(user)
    }
}

export default ResetPasswordService;
