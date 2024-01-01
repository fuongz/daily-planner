import { Module } from '@nestjs/common';
import { CategoryController } from './Category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from '@/mongo/schemas';
import { CategoryService } from './Category.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema,
      },
    ]),
  ],
  providers: [CategoryService],
  controllers: [CategoryController],
  exports: [CategoryService],
})
export class CategoryModule {}
