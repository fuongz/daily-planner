import { Module } from '@nestjs/common';
import { WalletController } from './Wallet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Category,
  CategorySchema,
  Wallet,
  WalletSchema,
} from 'src/mongo/schemas';
import { WalletService } from './Wallet.service';
import { CategoryModule } from '../Category/Category.module';
import { CategoryService } from '../Category/Category.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Wallet.name,
        schema: WalletSchema,
      },
      {
        name: Category.name,
        schema: CategorySchema,
      },
    ]),
    CategoryModule,
  ],
  providers: [WalletService, CategoryService],
  controllers: [WalletController],
  exports: [WalletService],
})
export class WalletModule {}
