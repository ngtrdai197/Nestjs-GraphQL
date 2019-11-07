import { Query, Resolver, Args, Mutation } from '@nestjs/graphql';
import {
  User,
  NewUserInput,
  UsersPagination,
} from '../../graphql/models/user.graphql';
import { CreateUserDto } from '../models/user.dto';
import { UserService } from '../user.service';
import { CurrentUser } from '../../common/decorators/req-user.decorator';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../common/guards/gql-auth.guard';

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

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
}
