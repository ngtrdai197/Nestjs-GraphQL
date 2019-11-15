import { IUser } from '../../user/interfaces/user.interface';
import { Document } from 'mongoose';

export interface IFriendsRequest extends Document {
  user: string | IUser;
  toUser: string | IUser;

  notification?: string;
  status: number;
}
