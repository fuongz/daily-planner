import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { TaskService } from './Task.service';
import { FormatResponseInterceptor } from 'src/core/interceptors/format-response.interceptor';
import { KindeGuard } from '../Auth/Auth.guard';

@Controller('tasks')
@UseInterceptors(FormatResponseInterceptor)
@UseGuards(KindeGuard)
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  async getAll() {
    return this.taskService.getAll();
  }
}
