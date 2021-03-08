import { Request, Response } from 'express';
import ShowProductService from '@modules/products/services/ShowProductService';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {
    public async show(request: Request, response: Response): Promise<Response> {
        const showProfile = new ShowProfileService();
        const user_id = request.user.id;
        
        console.log(user_id)
        console.log('ac9db015-3ac7-438d-b5e7-8d8dba6002f3')
        
        const user = await showProfile.execute({ user_id });
        console.log(user)        
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
