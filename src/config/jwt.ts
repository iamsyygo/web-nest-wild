import { Injectable } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { YAML_DATA } from './js-yaml';

const jwt = YAML_DATA.jwt;

export default JwtModule.register({
  secret: jwt.secret,
  signOptions: { expiresIn: jwt.expiresIn },
});

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwt.secret,
    });
  }

  // 此方法在令牌验证后调用,passeport自动解码JWT并将其作为参数传递给此方法
  async validate(payload: any) {
    return payload;
  }
}
