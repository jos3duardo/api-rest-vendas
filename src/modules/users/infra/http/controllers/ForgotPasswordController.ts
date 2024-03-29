import { Request, Response } from 'express';
import ListUsersService from '../../../services/ListUsersService';
import CreateUserService from "../../../services/CreateUserService";
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';

export default class ForgotPasswordController {

    public async create(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;

        const sendForgotPasswordEmail = new SendForgotPasswordEmailService();

        await sendForgotPasswordEmail.execute({ email });

        return response.status(204).json()
    }
}
