import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KindeService } from './Kinde.service';
import { KindeStrategy } from './Kinde.strategy';
import { KindeGuard } from './Auth.guard';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [ConfigModule, PassportModule],
  providers: [KindeStrategy, KindeService, KindeGuard],
  exports: [KindeService, KindeStrategy, KindeGuard],
})
export class KindeModule {}
