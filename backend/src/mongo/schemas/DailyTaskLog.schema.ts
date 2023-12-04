import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './User.schema';
import { DailyTask } from './DailyTask.schema';

@Schema()
export class DailyTaskLog {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'DailyTask' })
  task_id: DailyTask;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id: User;

  @Prop()
  status: boolean;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  date: Date;

  @Prop({
    default: Date.now(),
  })
  created_at: Date;

  @Prop({
    default: Date.now(),
  })
  updated_at: Date;
}

export const DailyTaskLogSchema = SchemaFactory.createForClass(DailyTaskLog);
