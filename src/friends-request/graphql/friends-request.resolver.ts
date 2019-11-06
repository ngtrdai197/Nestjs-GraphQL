import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { HttpException, HttpStatus } from '@nestjs/common';

import {
  FriendsRequest,
  InputFriendsRequest,
  FriendRequestPagination,
} from '../../common/graphql/models/friend-request.graphql';
import { IFriendsRequest } from '@/friends-request/interfaces/friends-request.interface';
import { FriendsRequestService } from '../friends-request.service';

@Resolver(of => FriendsRequest)
export class FriendsRequestResolver {
  constructor(private readonly friendsRequestService: FriendsRequestService) {}

  @Mutation(returns => FriendsRequest)
  async createFriendsRequest(
    @Args() createFriendsRequest: InputFriendsRequest,
  ): Promise<IFriendsRequest> {
    if (!createFriendsRequest.toUser || !createFriendsRequest.user) {
      throw new HttpException(
        {
          message: 'loi thieu params',
          statusCode: 400,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const conditions = {
      user: createFriendsRequest.user,
      toUser: createFriendsRequest.toUser,
      status: {
        $nin: [1, -1],
      },
    };
    const checkRequest = await this.friendsRequestService.findOne(conditions);
    if (!checkRequest) {
      return await this.friendsRequestService.create(createFriendsRequest);
    }
    throw new HttpException(
      {
        message: 'request da ton tai',
        statusCode: 400,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
  @Mutation(returns => Boolean)
  async removeFriendsRequest(@Args('requestId')requestId: string): Promise<any> {
    const conditions = {
      _id: requestId,
      status: {
        $nin: [1, -1],
      },
    };
    const friendRequest = await this.friendsRequestService.findOne(conditions);
    if (!friendRequest) {
      throw new HttpException(
        {
          message: 'khong tim thay friend request',
          statusCode: 400,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.friendsRequestService.remove(conditions);
  }

  @Mutation(returns => FriendsRequest)
  async updateNoficationFriendsRequest(
    @Args('requestId') requestId: string,
    @Args('notification') notification: string,
  ): Promise<IFriendsRequest> {
    const query = { _id: requestId };
    const friendsRequest = await this.friendsRequestService.findOne(query);
    if (!friendsRequest) {
      throw new HttpException(
        {
          message: 'khong tim thay request voi requestId: ' + requestId, // i18n not-found friend request ...
          statusCode: 404,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.friendsRequestService.update(friendsRequest._id, {
      notification,
    });
  }

  @Mutation(returns => FriendsRequest)
  async updateStatusFriendRequest(
    @Args('requestId') requestId: string,
    @Args('status') status: number,
  ): Promise<IFriendsRequest> {
    const query = { _id: requestId };
    const friendRequest = await this.friendsRequestService.findOne(query);
    if (!friendRequest) {
      throw new HttpException(
        {
          message: 'khong tim thay request voi requestId: ' + requestId, // i18n not-found friend request ...
          statusCode: 404,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    if (status !== -1 && status !== 0 && status !== 1) {
      throw new HttpException(
        {
          message:
            'trang thai cap nhat cho friend request voi status: ' +
            status +
            ' khong hop le.', // i18n not-found friend request ...
          statusCode: 400,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // delete friend request in reserve
    const conditions = {
      user: friendRequest.toUser,
      toUser: friendRequest.user,
      status: { $nin: [1, -1] },
    };
    await this.friendsRequestService.deleteManyFriendRequest(conditions);

    return await this.friendsRequestService.update(friendRequest._id, {
      status,
    });
  }

  @Query(returns => FriendRequestPagination)
  async findAllFriendRequest(
    @Args('page') page: number,
    @Args('perPage') perPage: number,
  ): Promise<any> {
    const conditions = {
      page,
      perPage,
    };
    return await this.friendsRequestService.findAllAnPopulate(conditions);
  }
}
