import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate';
import UserController from '../controllers/UserController';

const usersRoutes = Router();
const userController = new UserController();

usersRoutes.get('/', userController.index);

usersRoutes.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    }),
    userController.create
);

export default usersRoutes;
