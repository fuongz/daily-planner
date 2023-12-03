import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { KindeStrategy } from './Kinde.strategy';

@Injectable()
export class KindeGuard extends AuthGuard('kinde') {}
