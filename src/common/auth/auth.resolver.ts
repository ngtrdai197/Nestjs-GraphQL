import { Resolver, Mutation } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { ILogin } from "./interfaces/auth.interface";


@Resolver('AuthResolver')
export class AuthResolver {
    constructor(private readonly authService: AuthService) { }

    @Mutation(() => String)
    async signIn(login: ILogin): Promise<any> {
        return await this.authService.signIn(login)
    }
}