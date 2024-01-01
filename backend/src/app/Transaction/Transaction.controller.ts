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
import { Transaction } from '@/mongo/schemas';
import { TransactionService } from './Transaction.service';

@Controller('transactions')
@UseInterceptors(FormatResponseInterceptor)
@UseGuards(KindeGuard)
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get()
  async getAll(@Req() req: any) {
    return this.transactionService.getAll(req.user);
  }

  @Post()
  async create(@Req() req: any) {
    const doc: Transaction = {
      ...req.body,
      user_id: req.user._id,
    };
    return this.transactionService.create(doc);
  }
}
