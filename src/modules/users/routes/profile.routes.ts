import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import ProfileController from '@modules/users/controllers/ProfileController';

const profileRoutes = Router();
const profileController = new ProfileController();

profileRoutes.use(isAuthenticated)

profileRoutes.get(
    '/', 
    profileController.show
);

profileRoutes.put(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            old_password: Joi.string(),
            password: Joi.string().optional(),
            password_confirmation: Joi.string()
            .valid(Joi.ref('password'))
            .when('password', {
                is: Joi.exist(),
                then: Joi.required()
            }),
        }
    }),
    profileController.update
);

export default profileRoutes;
