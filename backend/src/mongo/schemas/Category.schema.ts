import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './User.schema';

@Schema({
  timestamps: true,
})
export class Category {
  @Prop()
  name: string;

  @Prop({ default: 1 })
  type: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  parent_id: Category;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id: User;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
