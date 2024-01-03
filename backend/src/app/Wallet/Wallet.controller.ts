import {
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FormatResponseInterceptor } from '@/core/interceptors/format-response.interceptor';
import { KindeGuard } from '../Kinde/Kinde.guard';
import { Wallet } from '@/mongo/schemas';
import { WalletService } from './Wallet.service';
import { CategoryService } from '../Category/Category.service';

@Controller('wallets')
@UseInterceptors(FormatResponseInterceptor)
@UseGuards(KindeGuard)
export class WalletController {
  constructor(
    private walletService: WalletService,
    private categoryService: CategoryService,
  ) {}

  @Get()
  async getAll(@Req() req: any) {
    return this.walletService.getAll(req.user);
  }

  @Post()
  async create(@Req() req: any) {
    const doc: Wallet = {
      ...req.body,
      user_id: req.user._id,
    };
    const wallet = await this.walletService.create(doc);
    const categories = await this.categoryService.createDefaults(req.user);
    return { wallet, categories };
  }
}
