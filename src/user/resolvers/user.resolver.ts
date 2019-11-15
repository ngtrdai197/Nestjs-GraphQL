import { Query, Resolver, Args, Mutation } from '@nestjs/graphql';
import {
  User,
  NewUserInput,
  UsersPagination,
  Pagination,
} from '../../graphql/models/user.graphql';
import { CreateUserDto } from '../models/user.dto';
import { UserService } from '../user.service';
import { CurrentUser } from '../../common/decorators/req-user.decorator';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../common/guards/gql-auth.guard';
import { IUser } from '../interfaces/user.interface';
import { FriendsRequestService } from '../../friends-request/friends-request.service';

@Resolver(of => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly fqService: FriendsRequestService
  ) { }

  @Query(returns => UsersPagination)
  // @UseGuards(GqlAuthGuard)
  async getUsers(
    @Args('page') page: number,
    @Args('perPage') perPage: number,
  ): Promise<any> {
    const conditions = {
      page,
      perPage,
    };
    return await this.userService.findAll(conditions);
  }

  @Query(returns => User)
  @UseGuards(GqlAuthGuard)
  async currentUser(@CurrentUser() user: any) {
    return await user;
  }

  @Mutation(returns => User)
  async addUser(@Args() newUser: NewUserInput) {
    const user = await this.userService.create(newUser);
    return user;
  }

  @Query(() => Pagination)
  @UseGuards(GqlAuthGuard)
  async friends(
    @CurrentUser() currentUser: IUser,
    @Args('fullName') fullName: string
  ): Promise<Pagination> {
    console.log('current USer: ' + currentUser);

    const result = await this.fqService.findAllFriends(currentUser._id, fullName)
    console.log(`result: ${JSON.stringify(result)}`);

    let data = []
    await Promise.all(
      result.map(async (x) => {
        const friendId = currentUser._id == x.user.toString() ? x.toUser : x.user

        const query = { _id: friendId, fullName: { $regex: fullName, $options: 'i' } }
        console.log(`query: `, query);

        const user = await this.userService.findOne(query)
        console.log(user);
        if (user) {
          data.push(user)
        }
      })
    )
    console.log(data);

    return {
      hasNextPage: true,
      result: data
    }
  }

}
