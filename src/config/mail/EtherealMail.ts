import nodemailer from 'nodemailer';
import HandlebarsMailTemplate from './HandlebarsMailTemplate';

interface IMailContact {
    name: string,
    enail: string,
}

interface ITemplateVariable {
    [key: string]: string | number
}

interface IParseMailTemplate {
    template: string,
    variables: ITemplateVariable;
} 


interface ISendMail {
    to: IMailContact,
    from?: IMailContact,
    subject: string,
    templateData: IParseMailTemplate
}

export default class EtherealMail {
    static async sendMail({ to, from, subject, templateData }: ISendMail): Promise<void> {
        const account = await nodemailer.createTestAccount()
        
        const mailTemplate = new HandlebarsMailTemplate();
        
        const transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass,
            }
        });
        
        const message = await transporter.sendMail({
            from: {
                name: from?.name,
                address: from?.enail
            },
            to: {
                name: to.name,
                address: to.enail
            },
            subject,
            html: await  mailTemplate.parse(templateData)
        })
        
        console.log('messagem sendo %s', message.messageId)
        console.log('Preview URL: %s: ', nodemailer.getTestMessageUrl(message));
    }
}
