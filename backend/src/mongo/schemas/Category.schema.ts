import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

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
}

export const CategorySchema = SchemaFactory.createForClass(Category);
