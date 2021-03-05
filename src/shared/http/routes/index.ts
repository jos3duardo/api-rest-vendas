import {Router} from 'express';
import productsRoutes from '@modules/products/routes/products.routes';
import usersRoutes from '@modules/users/routes/user.routes'
const routes = Router()

routes.use('/products', productsRoutes);
routes.use('/users', usersRoutes);

routes.get('/',((req, res) => {
    return res.json({message: 'api online'})
}));

export default routes
