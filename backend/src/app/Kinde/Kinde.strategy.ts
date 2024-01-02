import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { KindeService } from './Kinde.service';
import { UserService } from '../User/User.service';

@Injectable()
export class KindeStrategy extends PassportStrategy(Strategy, 'kinde') {
  constructor(
    private readonly kindeService: KindeService,
    private userService: UserService,
  ) {
    super();
  }

  async validate(payload: any): Promise<any> {
    const bearerToken =
      payload.headers && typeof payload.headers['authorization'] !== 'undefined'
        ? payload.headers['authorization']
        : null;
    if (!bearerToken) {
      throw new UnauthorizedException();
    }
    const bearerTokenArr = bearerToken.split(' ');
    if (bearerTokenArr.length < 2 || bearerTokenArr[1] === 'undefined') {
      throw new UnauthorizedException();
    }
    const validated: any = await this.kindeService.validate(bearerTokenArr[1]);
    let user = await this.userService.getUserById(validated['sub']);
    if (!user) {
      user = await this.userService.syncUser({
        id: validated['sub'],
        org_code: validated['org_code'],
        iss: validated['iss'],
        email: validated['email'],
      });
    }
    return { ...validated, _id: user._id };
  }
}
