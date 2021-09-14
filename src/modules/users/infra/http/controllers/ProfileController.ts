import { Request, Response } from 'express';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

export default class ProfileController {
    public async show(request: Request, response: Response): Promise<Response> {
        const showProfile =  container.resolve(ShowProfileService);
        const id = request.user.id;
        
        const user = await showProfile.execute({ id });
        return response.json(classToClass(user))
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const { name, email, password, old_password } = request.body;
        
        const user_id = await request.user.id;
        
        const updateProfile =  container.resolve(UpdateProfileService);

        const user = await updateProfile.execute({ 
            user_id, name, email, password, old_password 
        });

        return response.json(classToClass(user))
    }
}
