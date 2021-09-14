import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import SessionControlle from '../http/controllers/SessionControlle';

const sessionRouter = Router();
const sessionController = new SessionControlle();

sessionRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    }),
    sessionController.create
);

export default sessionRouter;
