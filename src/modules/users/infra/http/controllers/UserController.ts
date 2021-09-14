import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';
import { classToClass } from 'class-transformer';
import ListUsersService from '@modules/users/services/ListUsersService';
import ShowUserService from '../../../services/ShowUserService';

export default class UsersController {
    public async index(request: Request, response: Response): Promise<Response> {
        let search = '';
        const sortField = String(request.query.sortField);

        if (request.query.search) {
            search = String(request.query.search);
        }

        const listUser = container.resolve(ListUsersService);

        const users = await listUser.execute(search, sortField);

        return response.json(classToClass(users));
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showUser = container.resolve(ShowUserService);

        const user = await showUser.execute({id});

        return response.json(user);
    }
    
    public async create(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;

        const createUser = container.resolve(CreateUserService);

        const user = await createUser.execute({
            name,
            email,
            password,
        });

        return response.json(classToClass(user));
    }
}
