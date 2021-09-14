import {container} from 'tsyringe'

import {ICustomerRepository} from '@modules/customers/domain/repositories/ICustomerRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';

import {IOrdersRepository} from '@modules/orders/domain/repositories/IOrdersRepository';
import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';

import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';

import {IUserRepository} from '@modules/users/domain/repositories/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

import { IUserTokenRepository } from '@modules/users/domain/repositories/IUserTokenRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import {IHashProvider} from '@modules/users/providers/HashProvider/models/IHashProvider';
import BcryptHashProvider from '@modules/users/providers/HashProvider/implementations/BcryptHashProvider';

//a cada ciclo de vida da nossa aplicação ele mantem uma unica instancia dessa classe
container.registerSingleton<ICustomerRepository>(
    'CustomersRepository', CustomersRepository
);

container.registerSingleton<IProductsRepository>(
    'ProductsRepository', ProductsRepository,
);

container.registerSingleton<IOrdersRepository>(
    'OrdersRepository', OrdersRepository,
);

container.registerSingleton<IUserRepository>(
    'UserRepository', UserRepository
)

container.registerSingleton<IUserTokenRepository>(
    'UserTokensRepository', UserTokensRepository
)

container.registerSingleton<IHashProvider>(
    'HashProvider', BcryptHashProvider
)
