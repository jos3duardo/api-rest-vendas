import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import AppError from '@shared/errors/AppError';
import EtherealMail from '@config/mail/EtherealMail';
import path from 'path';
import { ISendForgotPasswordEmail } from '@modules/users/domain/models/ISendForgotPasswordEmail';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { IUserTokenRepository } from '@modules/users/domain/repositories/IUserTokenRepository';

@injectable()
class SendForgotPasswordEmailService {
    
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,

        @inject('UserTokensRepository')
        private userTokenRepository: IUserTokenRepository,
    ) {}
    
    public async execute({ email }: ISendForgotPasswordEmail): Promise<void> {
     
        const user = await this.userRepository.findByEmail(email);
        
        
        if (!user){
            throw new AppError('USer does not exists.')
        }

        const { token } = await this.userTokenRepository.generate(user.id);
        
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
                    link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
                },
            },
        });
    }
}

export default SendForgotPasswordEmailService;
