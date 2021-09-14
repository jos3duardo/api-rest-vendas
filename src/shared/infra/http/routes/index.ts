import {Router} from 'express';
import productsRouter from '@modules/products/infra/routes/productsRouter';
import usersRouter from '@modules/users/infra/routes/user.routes'
import sessionRouter from '@modules/users/infra/routes/sessionRouter';
import passwordRouter from '@modules/users/infra/routes/passwordRouter'
import profileRouter from '@modules/users/infra/routes/profileRouter';
import customersRouter from '@modules/customers/infra/routes/customer.routes';
import ordersRouter from '@modules/orders/infra/routes/orders.routes';
const routes = Router()

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', customersRouter);
routes.use('/orders', ordersRouter)

routes.get('/',((req, res) => {
    return res.json({message: 'api online'})
}));

export default routes
