import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'
import { UserService } from '../../user/user.service';
import { IJwtPayload, ILogin } from './interfaces/auth.interface';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService
  ) { }

  async validateUser(jwtPayload: IJwtPayload): Promise<any> {
    const query = { username: jwtPayload.username };
    return await this.userService.findOne(query)
  }

  async signIn(login: ILogin): Promise<any> {
    const exists = await this.userService.findOne({ username: login.username })
    if (!exists) {
      throw new HttpException({
        statusCode: 400,
        message: 'Credentials not valid'
      }, HttpStatus.BAD_REQUEST)
    }
    const user = await this.userService.findOne({ password: login.password })
    if (!user) {
      throw new HttpException({
        statusCode: 400,
        message: 'Credentials not valid'
      }, HttpStatus.BAD_REQUEST)
    }
    const jwtPayload: IJwtPayload = {
      _id: user._id,
      username: user.username,
      fullName: user.fullName
    }
    const token = await this.jwtSignToken(jwtPayload)
    return { token }
  }

  private async jwtSignToken(jwtPayload: IJwtPayload): Promise<string> {
    return await jwt.sign(jwtPayload, this.configService.secretKey)
  }
}
