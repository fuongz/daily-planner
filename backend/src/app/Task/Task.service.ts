import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DailyTask } from 'src/mongo/schemas';
import { IAuthUser } from 'src/types/AuthUser';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(DailyTask.name)
    private dailyTaskModel: Model<DailyTask>,
  ) {}

  async getAll(user: IAuthUser) {
    return this.dailyTaskModel.find({
      user_id: user._id,
    });
  }

  async create(task: DailyTask) {
    return this.dailyTaskModel.create(task);
  }
}
