import { Request, Response } from 'express';
import ListUsersService from '@modules/users/services/ListUsersService';
import CreateUserService from '@modules/users/services/CreateUsersService';

export default class UserController {
    public async index(request: Request, response: Response): Promise<Response> {
        const listUser = new ListUsersService();
        const user = await listUser.execute();

        return response.json(user)
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({ name, email, password });

        return response.json(user)
    }
}
