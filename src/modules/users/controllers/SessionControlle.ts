import { Request, Response } from 'express';
import CreateSessionsService from '@modules/users/services/CreateSessionsService';
import { classToClass } from 'class-transformer';

export default class SessionControlle {
    public async create(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;
        
        const createSession = new CreateSessionsService();
        
        const user = await createSession.execute({
            email,
            password
        });

        return response.json(classToClass(user))
    }  
}
