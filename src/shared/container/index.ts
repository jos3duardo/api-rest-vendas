import {container} from 'tsyringe'

import {ICustomerRepository} from '@modules/customers/domain/repositories/ICustomerRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';

//a cada ciclo de vida da nossa aplicação ele mantem uma unica instancia dessa classe
container.registerSingleton<ICustomerRepository>(
    'CustomersRepository',
    CustomersRepository
);
