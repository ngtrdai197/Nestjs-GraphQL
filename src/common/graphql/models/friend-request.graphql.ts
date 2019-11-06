import { ObjectType, Field, ID, ArgsType } from 'type-graphql';
import { User } from './user.graphql';

@ObjectType()
export class FriendsRequest {
  @Field(type => ID)
  // tslint:disable-next-line:variable-name
  _id: string;

  @Field(type => User)
  user: User;

  @Field(type => User)
  toUser: User;

  @Field(type => String)
  notification: string;

  @Field(type => Number)
  status: number;
}

// tslint:disable-next-line:max-classes-per-file
@ArgsType()
export class InputFriendsRequest {
  @Field()
  user: string;

  @Field()
  toUser: string;

  @Field({ nullable: true })
  notification: string;

  @Field()
  status: number;
}

// tslint:disable-next-line:max-classes-per-file
@ObjectType()
export class FriendRequestPagination {
  @Field(type => Number)
  currentPage: number;

  @Field(type => Number)
  total: number;

  @Field(type => [FriendsRequest]!)
  friendRequests: [FriendsRequest];

  @Field(type => Number)
  pages: number;
}
