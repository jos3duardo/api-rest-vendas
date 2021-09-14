import { getRepository, Repository } from 'typeorm';
import UserToken from '../entities/UserToken';
import { IUserTokenRepository } from '@modules/users/domain/repositories/IUserTokenRepository';

class UserTokensRepository implements IUserTokenRepository{
    private ormRepository: Repository<UserToken>;

    constructor() {
        this.ormRepository = getRepository(UserToken);
    }
    
    public async findByToken(token: string): Promise<UserToken | undefined> {
        return  await this.ormRepository.findOne({
            where: {
                token,
            },
        });
    }

    public async generate(user_id: string): Promise<UserToken> {
        const userToken = await this.ormRepository.create({
            user_id,
        });
        
        await this.ormRepository.save(userToken)

        return userToken;
    }
}

export default UserTokensRepository
