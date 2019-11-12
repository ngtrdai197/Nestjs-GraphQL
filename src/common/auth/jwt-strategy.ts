import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ConfigService } from '../config/config.service';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { IJwtPayload } from './interfaces/auth.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.secretKey,
    });
  }

  async validate(jwtPayload: IJwtPayload): Promise<any> {
    /*  
     * hàm này được gọi khi token được validate
     * nếu token invalid trả về Unauthorization và không đi vào hàm này để handle
    */
    const user = await this.authService.validateUser(jwtPayload);
    
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
