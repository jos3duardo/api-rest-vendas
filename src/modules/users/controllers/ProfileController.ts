import { Request, Response } from 'express';
import ShowProductService from '@modules/products/services/ShowProductService';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {
    public async show(request: Request, response: Response): Promise<Response> {
        const showProfile = new ShowProfileService();
        const user_id = request.user.id;
        
        const user = await showProfile.execute({ user_id });
        return response.json(user)
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const { name, email, password, old_password } = request.body;
        
        const user_id = await request.user.id;
        
        const updateProfile = new UpdateProfileService();

        const user = await updateProfile.execute({ 
            user_id, name, email, password, old_password 
        });

        return response.json(user)
    }
}
