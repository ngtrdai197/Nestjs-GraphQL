import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { ILogin } from './interfaces/auth.interface'
import { Login } from './login.entity'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../guards/gql-auth.guard'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  async signIn(@Args() login: Login): Promise<any> {
    return await this.authService.signIn(login)
  }
}
