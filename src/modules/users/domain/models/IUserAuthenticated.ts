import { IUser } from '@modules/users/domain/models/IUser';

export interface IUserAuthenticated {
    user: IUser;
    token: string;
}
