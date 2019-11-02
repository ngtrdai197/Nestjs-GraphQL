import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './models/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    try {
      const checkUserName = await this.userModel.findOne({
        username: createUserDto.username,
      });
      if (!checkUserName) {
        return await this.userModel.create(createUserDto);
      }
      throw new HttpException('Username đã tồn tại', HttpStatus.BAD_REQUEST);
    } catch (error) {
      throw error;
    }
  }
  async findAll(query?: any): Promise<Array<IUser>> {
    return await this.userModel.find(query);
  }
}