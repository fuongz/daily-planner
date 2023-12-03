import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { KindeService } from './Kinde.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class KindeStrategy extends PassportStrategy(Strategy, 'kinde') {
  constructor(private readonly kindeService: KindeService) {
    super();
  }

  async validate(payload: any): Promise<any> {
    const bearerToken =
      typeof payload.headers['authorization'] !== 'undefined'
        ? payload.headers['authorization']
        : null;
    if (!bearerToken) {
      throw new UnauthorizedException();
    }
    const bearerTokenArr = bearerToken.split(' ');
    if (bearerTokenArr.length < 2) {
      throw new UnauthorizedException();
    }
    const validated = await this.kindeService.validate(bearerTokenArr[1]);
    return validated;
  }
}
