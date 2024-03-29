import { Request, Response } from 'express';
import ListUsersService from '../../../services/ListUsersService';
import CreateUserService from "../../../services/CreateUserService";
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import { container } from 'tsyringe';

export default class ResetPasswordController {

    public async create(request: Request, response: Response): Promise<Response> {
        const { token, password } = request.body;
        
        const resetPasswordEmail = container.resolve(ResetPasswordService)

        await resetPasswordEmail.execute({ token, password });

        return response.status(204).json()
    }
}
