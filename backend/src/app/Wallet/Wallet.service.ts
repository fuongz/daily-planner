import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAuthUser } from '@/types/AuthUser';
import { Wallet } from '@/mongo/schemas';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name)
    private walletModel: Model<Wallet>,
  ) {}

  async getAll(user: IAuthUser) {
    return this.walletModel.find({
      user_id: user._id,
    });
  }

  async create(doc: Wallet) {
    return this.walletModel.create(doc);
  }
}
