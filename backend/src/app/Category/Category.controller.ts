import {
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FormatResponseInterceptor } from '@/core/interceptors/format-response.interceptor';
import { KindeGuard } from '../Kinde/Kinde.guard';
import { Category } from '@/mongo/schemas';
import { CategoryService } from './Category.service';

@Controller('categories')
@UseInterceptors(FormatResponseInterceptor)
@UseGuards(KindeGuard)
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  async getAll(@Req() req: any) {
    return this.categoryService.getAll(req.user);
  }

  @Post()
  async create(@Req() req: any) {
    const doc: Category = {
      ...req.body,
      user_id: req.user._id,
    };
    return this.categoryService.create(doc);
  }
}
