import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ConfigService } from '../config/config.service';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly authService: AuthService,
    private readonly _configurationService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'SECRET_KEY',
    });
    console.log('Run Jwt Strategy');
  }

  async validate({ username, password }): Promise<any> {
    console.log('vo validate func within JwtStrategy ...');
    const user = await this.authService.validateUser(username, password);
    return user;
  }
}
