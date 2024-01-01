import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './User.schema';
import { Wallet } from './Wallet.schema';
import { Category } from './Category.schema';

@Schema({
  timestamps: true,
})
export class Transaction {
  @Prop()
  amount: number;

  @Prop()
  note: string;

  @Prop()
  timestamp: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category_id: Category;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' })
  wallet_id: Wallet;

  @Prop({ default: 1 })
  status: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id: User;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
