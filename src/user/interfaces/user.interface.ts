import { Document } from 'mongoose';
export interface IUser extends Document {
  readonly username: String;
  readonly password: String;
  readonly fullName: String;
  readonly address?: String;
}
