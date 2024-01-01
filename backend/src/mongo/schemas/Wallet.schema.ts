import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './User.schema';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
})
export class Wallet {
  @Prop({
    default: 'basic',
  })
  type: string;

  @Prop()
  name: string;

  @Prop()
  currency: string;

  @Prop({ default: 1 })
  status: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id: User;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
