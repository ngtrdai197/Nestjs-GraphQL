import { Query, Resolver, Args, Mutation } from '@nestjs/graphql';
import { User, NewUserInput } from '../../common/graphql/models/user.graphql';
import { CreateUserDto } from '../models/user.dto';
import { UserService } from '../user.service';

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(returns => [User])
  async getUsers() {
    const query = {};
    return await this.userService.findAll(query);
  }

  @Mutation(returns => User)
  async addUser(@Args() newUser: NewUserInput) {
    const user = await this.userService.create(newUser);
    console.log(user);
    return user;
  }
}
