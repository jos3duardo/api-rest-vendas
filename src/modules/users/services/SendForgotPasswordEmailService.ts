import { getCustomRepository } from 'typeorm';
import UserTokensRepository from '@modules/users/typeorm/repositories/UserTokensRepository';
import UserRepository from '@modules/users/typeorm/repositories/UserRepository';
import AppError from '@shared/errors/AppError';
import EtherealMail from '@config/mail/EtherealMail';
import path from 'path';

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

        const { token } = await userTokenRepository.generate(user.id);
        
        const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');
        
        await EtherealMail.sendMail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: '[API Vendas] Recuperação de Senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    link: `http://localhost:3333/reset_password?token=${token}`
                },
            },
        });
    }
}

export default SendForgotPasswordEmailService;
