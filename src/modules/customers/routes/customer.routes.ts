import { Router } from 'express'
import CustomerController from '../controllers/CustomerController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const customersRoutes = Router();
const customersController = new CustomerController()

customersRoutes.use(isAuthenticated)

customersRoutes.get('/', customersController.index);

customersRoutes.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        }
    }),
    customersController.show
);

customersRoutes.post(
    '/',
    celebrate({
        [Segments.BODY]: {
          name: Joi.string().required(),
          email: Joi.string().email().required(),
        }
    }),
    customersController.create
);

customersRoutes.put(
    '/:id',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
        },
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        }
    }),
    customersController.update
);

customersRoutes.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        }
    }),
    customersController.delete
);

export default customersRoutes;
