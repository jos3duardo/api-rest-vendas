import { getRepository, Like, Repository } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IPaginateUser } from '@modules/users/domain/models/IPaginateUser';
import { IUser } from '@modules/users/domain/models/IUser';

class UserRepository implements IUserRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async findAll(): Promise<User[]> {
        return  await this.ormRepository.find();
    }
    
    public async findAllPaginate(search: string, sortField: string): Promise<IPaginateUser> {
        if (search) {
            return (await this.ormRepository
                .createQueryBuilder()
                .where([{ name: Like(`%${search}%`) }, { email: Like(`%${search}%`) }])
                .orderBy(`User.name`, 'ASC')
                .paginate()) as IPaginateUser;
        }

        return (await this.ormRepository
            .createQueryBuilder()
            .orderBy('User.name', 'ASC')
            .paginate()) as IPaginateUser;
    }
    
    public async create({ name, email, password }: ICreateUser): Promise<IUser> {
        const user = this.ormRepository.create({ name, email, password });

        await this.ormRepository.save(user);

        return user;
    }
    
    public async save(user: IUser): Promise<IUser> {
        await this.ormRepository.save(user);

        return user;
    }


    public async findByName(name: string): Promise<User | undefined> {
        return await this.ormRepository.findOne({
            where: {
                name,
            },
        });
    }

    public async findById(id: string): Promise<User | undefined> {
        return await this.ormRepository.findOne({
            where: {
                id,
            },
        });
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        
        return await this.ormRepository.findOne({
            where: {
                email,
            },
        });
    }
}


export default UserRepository
