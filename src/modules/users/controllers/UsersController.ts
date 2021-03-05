import { Request, Response } from 'express';
import ShowUserService from '../services/ShowUserService';
import CreateUserService from '../services/CreateUserService';
import UpdateUserService from '../services/UpdateUserService';
import DeleteUserService from '../services/DeleteUserService';
import ListUserService from '../services/ListUserService';

export default class UsersController {
    public async index(request: Request, response: Response): Promise<Response> {
        const listUsers = new ListUserService();
        
        const users = await listUsers.execute();
        
        return response.json(users);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        
        const showUsers = new ShowUserService();

        const users= await showUsers.execute({ id });

        return response.json(users);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;
        
        const createUser = new CreateUserService();
        const users= await createUser.execute({
            name,
            email,
            password,
        });
        
        return response.json(users);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;
        const { id } = request.params;

        const updateUser = new UpdateUserService();
        
        const users= await updateUser.execute({
            id,
            name,
            email,
            password,
        });
        
        return response.json(users);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        
        const deleteUser = new DeleteUserService()
        
        await deleteUser.execute({ id })
        
        return response.json([])
    }

}
