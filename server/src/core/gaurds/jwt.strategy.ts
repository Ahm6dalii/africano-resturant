import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        return request.headers.token as string;
      }]),
      ignoreExpiration: false,
      secretOrKey: 'adax',
      // secretOrKey: configService.get<string>('adax'),
    });
  }

  async validate(payload: any) {
    return { username: payload.username, permissions: payload.permissions ,isSuperAdmin:payload.isSuperAdmin,userId:payload.userId };
  }
}
