import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import UserController from '../controllers/UserController';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated'
import uploadConfig from '@config/uploads';
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController';

const usersRouter = Router();
const usersController = new UserController();
const usersAvatarController = new UserAvatarController();

const upload = multer(uploadConfig.multer);

usersRouter.get(
    '/', 
    isAuthenticated, 
    usersController.index
);

usersRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        }
    }),
    isAuthenticated,
    usersController.show
);


usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    }),
    usersController.create
);

usersRouter.patch(
    '/avatar',
    isAuthenticated,
    upload.single('avatar'),
    usersAvatarController.update,
)


export default usersRouter;
