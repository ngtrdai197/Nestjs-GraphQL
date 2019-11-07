import { Query, Resolver, Args, Mutation } from '@nestjs/graphql';
import { User, NewUserInput, UsersPagination } from '../../graphql/models/user.graphql';
import { CreateUserDto } from '../models/user.dto';
import { UserService } from '../user.service';

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(returns => UsersPagination)
  async getUsers(@Args('page') page: number, @Args('perPage') perPage: number): Promise<any> {
    const conditions = {
      page,
      perPage,
    };
    return await this.userService.findAll(conditions);
  }

  @Mutation(returns => User)
  async addUser(@Args() newUser: NewUserInput) {
    const user = await this.userService.create(newUser);
    return user;
  }
}
