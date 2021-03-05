import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';

class ListUserService {
    public async execute(): Promise<User[]> {

        const productsRepository = getCustomRepository(UserRepository);

        return await productsRepository.find();
    }
}

export default ListUserService;
