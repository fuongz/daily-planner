import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAuthUser } from '@/types/AuthUser';
import { Category } from '@/mongo/schemas';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<Category>,
  ) {}

  async getAll(user: IAuthUser) {
    return this.categoryModel.find({
      user_id: user._id,
    });
  }

  async create(doc: Category) {
    return this.categoryModel.create(doc);
  }
}
