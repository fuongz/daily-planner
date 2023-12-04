import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KindeService } from './Kinde.service';
import { KindeStrategy } from './Kinde.strategy';
import { KindeGuard } from './Kinde.guard';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../User/User.module';
import { UserService } from '../User/User.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/mongo/schemas/User.schema';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    UserModule,
  ],
  providers: [UserService, KindeStrategy, KindeService, KindeGuard],
  exports: [KindeService, KindeStrategy, KindeGuard],
})
export class KindeModule {}
