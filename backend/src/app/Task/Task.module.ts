import { Module } from '@nestjs/common';
import { TaskController } from './Task.controller';
import { TaskService } from './Task.service';

@Module({
  providers: [TaskService],
  controllers: [TaskController],
  exports: [],
})
export class TaskModule {}
