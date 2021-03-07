import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import SessionControlle from '../controllers/SessionControlle';
import ForgotPasswordController from '@modules/users/controllers/ForgotPasswordController';
import ResetPasswordController from '@modules/users/controllers/ResetPasswordController';

const passwordRoutes = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPassowdController = new ResetPasswordController(); 

passwordRoutes.post(
    '/forgot',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
        }
    }),
    forgotPasswordController.create
);

passwordRoutes.post(
    '/reset',
    celebrate({
        [Segments.BODY]: {
            token: Joi.string().uuid().required(),
            password: Joi.string().required(),
            password_confirmation: Joi.string().required().valid(
                Joi.ref('password')
            )
        }
    }),
    resetPassowdController.create
);


export default passwordRoutes;
