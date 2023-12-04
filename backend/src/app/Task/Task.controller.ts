import {
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TaskService } from './Task.service';
import { FormatResponseInterceptor } from 'src/core/interceptors/format-response.interceptor';
import { KindeGuard } from '../Kinde/Kinde.guard';
import { DailyTask } from 'src/mongo/schemas';

@Controller('tasks')
@UseInterceptors(FormatResponseInterceptor)
@UseGuards(KindeGuard)
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  async getAll(@Req() req: any) {
    return this.taskService.getAll(req.user);
  }

  @Post()
  async create(@Req() req: any) {
    const task: DailyTask = {
      ...req.body,
      user_id: req.user._id,
    };
    return this.taskService.create(task);
  }
}
