import { getCustomRepository } from 'typeorm';
import UserTokensRepository from '@modules/users/typeorm/repositories/UserTokensRepository';
import UserToken from '@modules/users/typeorm/entities/UserToken';
import UserRepository from '@modules/users/typeorm/repositories/UserRepository';
import AppError from '@shared/errors/AppError';
import EtherealMail from '@config/mail/EtherealMail';

interface IRequest {
    email: string;
}


class SendForgotPasswordEmailService {
    public async execute({ email }: IRequest): Promise<void> {
        const userRepository = getCustomRepository(UserRepository);
        const userTokenRepository = getCustomRepository(UserTokensRepository);
     
        const user = await userRepository.findByEmail(email);
        
        
        if (!user){
            throw new AppError('USer does not exists.')
        }

        console.log(user)
        
        const token = await userTokenRepository.generate(user.id);
        
        //console.log(token)
        
        await  EtherealMail.sendMail({
            to: email,
            body: `Solicitação de redefiniçãop de senha recebida: ${token.token}`
        })
    }
}

export default SendForgotPasswordEmailService;
