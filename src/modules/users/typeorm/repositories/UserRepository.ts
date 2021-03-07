import { EntityRepository, Repository } from 'typeorm';
import User from '@modules/users/typeorm/entities/User';

@EntityRepository(User)
class UserRepository extends Repository<User> {
    public async findByName(name: string): Promise<User | undefined> {
        const user = await this.findOne({
            where: {
                name,
            },
        });
        
        return user;
    }

    public async findByUUID(id: string): Promise<User | undefined> {
        const user = await this.findOne({
            where: {
                id,
            },
        });

        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.findOne({
            where: {
                email,
            },
        });

        return user;
    }
}


export default UserRepository
