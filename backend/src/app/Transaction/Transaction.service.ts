import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAuthUser } from '@/types/AuthUser';
import { Transaction } from '@/mongo/schemas';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<Transaction>,
  ) {}

  async getAll(user: IAuthUser) {
    return this.transactionModel.find({
      user_id: user._id,
    });
  }

  async create(doc: Transaction) {
    return this.transactionModel.create(doc);
  }
}
