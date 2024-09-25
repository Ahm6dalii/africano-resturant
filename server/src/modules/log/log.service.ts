import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log } from 'src/core/schemas/log.schema';

@Injectable()
export class LogService {
  constructor(
    @InjectModel(Log.name) private logModel: Model<Log>,
  ) {}

  async createLog(action: string, adminId: string): Promise<Log> {
    const newLog = new this.logModel({ action, admin: adminId });
    return newLog.save();
  }

  async getAllLogs(): Promise<Log[]> {
    return this.logModel.find().populate('admin', 'username').exec();
  }
}