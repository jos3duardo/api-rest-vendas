import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import SessionControlle from '../controllers/SessionControlle';

const sessionRoutes = Router();
const sessionController = new SessionControlle();

sessionRoutes.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    }),
    sessionController.create
);

export default sessionRoutes;
