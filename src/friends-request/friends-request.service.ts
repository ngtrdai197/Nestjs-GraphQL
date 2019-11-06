import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IFriendsRequest } from './interfaces/friends-request.interface';
import { CreateFriendsRequestDto } from './dto/friends-request.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class FriendsRequestService {
  constructor(
    @InjectModel('FriendRequest')
    private readonly friendsRequestModel: Model<IFriendsRequest>,
  ) {}

  async create(
    friendsRequestDto: CreateFriendsRequestDto,
  ): Promise<IFriendsRequest> {
    return await this.friendsRequestModel.create(friendsRequestDto);
  }

  async findOne(conditions: any): Promise<IFriendsRequest> {
    return await this.friendsRequestModel.findOne(conditions);
  }

  async findOneAndPopulate(conditions: any): Promise<IFriendsRequest> {
    return await this.friendsRequestModel
      .findOne(conditions)
      .populate('user toUser', '-password');
  }

  async findAllAnPopulate(conditions: any): Promise<any> {
    const friendRequests = await this.friendsRequestModel
      .find({})
      .populate('user toUser', '-password')
      .skip(conditions.page * conditions.perPage - conditions.perPage)
      .limit(conditions.perPage);

    const counter = await this.friendsRequestModel.estimatedDocumentCount(); // count the total of document
    return Promise.resolve({
      friendRequests,
      currentPage: conditions.page,
      total: counter,
      pages: Math.ceil(counter / conditions.perPage),
    });
  }

  async remove(conditions: any): Promise<any> {
    const deleted = await this.friendsRequestModel.deleteOne(conditions);
    if (deleted) {
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }

  async update(
    requestId: string,
    dataUpdate: any,
  ): Promise<IFriendsRequest> {
    return await this.friendsRequestModel.findOneAndUpdate(
      { _id: requestId },
      dataUpdate,
      {
        new: true,
      },
    );
  }

  async deleteManyFriendRequest(conditions: any): Promise<any> {
    return await this.friendsRequestModel.deleteMany(conditions);
  }
}
