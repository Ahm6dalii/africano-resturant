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

  async getAllLogs(search, page, limit): Promise<any> {
    const skip = (page - 1) * limit;
    const searchCondition = search
      ? {
          $or: [
            { action: { $regex: search, $options: 'i' } },
            { 'admin.username': { $regex: search, $options: 'i' } }
          ]
        }
      : {};
  
    const allLogs = await this.logModel
      .find(searchCondition)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }) 
      .populate('admin', 'username')
      .exec();
  
    const total = await this.logModel
      .find(searchCondition)
      .countDocuments()
      .exec();
  
    const totalPages = Math.ceil(total / limit);
  
    return {
      total,
      totalPages,
      page,
      limit,
      data: allLogs,
    };
  }
  
  
  }