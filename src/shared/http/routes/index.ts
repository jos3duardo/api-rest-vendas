import {Router} from 'express';
import productsRoutes from '@modules/products/routes/products.routes';
import usersRoutes from '@modules/users/routes/user.routes'
import sessionRoutes from '@modules/users/routes/session.routes';
import passwordRoutes from '@modules/users/routes/password.routes'
import profileRoutes from '@modules/users/routes/profile.routes';
const routes = Router()

routes.use('/products', productsRoutes);
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionRoutes);
routes.use('/password', passwordRoutes)
routes.use('/profile', profileRoutes)

routes.get('/',((req, res) => {
    return res.json({message: 'api online'})
}));

export default routes
