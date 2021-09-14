import { IPaginateUser } from '@modules/users/domain/models/IPaginateUser';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';

@injectable()
class ListUsersService {

    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
    ) {}

    public async execute(
        search = '',
        sortField = 'name',
    ): Promise<IPaginateUser> {
        return await this.userRepository.findAllPaginate(search,sortField);
    }
}

export default ListUsersService;
