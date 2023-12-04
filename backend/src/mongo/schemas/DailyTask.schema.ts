import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './User.schema';

@Schema()
export class DailyTask {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id: User;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({
    default: Date.now(),
  })
  created_at: Date;

  @Prop({
    default: Date.now(),
  })
  updated_at: Date;
}

export const DailyTaskSchema = SchemaFactory.createForClass(DailyTask);
