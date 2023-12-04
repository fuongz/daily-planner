import { Module } from '@nestjs/common';
import { TaskController } from './Task.controller';
import { TaskService } from './Task.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DailyTask, DailyTaskSchema } from 'src/mongo/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DailyTask.name,
        schema: DailyTaskSchema,
      },
    ]),
  ],
  providers: [TaskService],
  controllers: [TaskController],
  exports: [TaskService],
})
export class TaskModule {}
