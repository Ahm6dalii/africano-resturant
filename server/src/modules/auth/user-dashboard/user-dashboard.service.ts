import { Delete, Injectable, NotFoundException, Param } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/core/schemas/user.schema';

@Injectable()
export class UserDashboardService {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,private _jwtService: JwtService
    ) {}

    async getAllUser(search, limit, page) {
        const skip = (page - 1) * limit;
    
        // Check if a search parameter is provided. If not, return all users.
        const searchCondition = search
          ? { name: { $regex: search, $options: 'i' } } // Modify 'name' based on the field you want to search
          : {}; // No search filter if search is not provided
    
        // Fetch users based on the search condition and pagination
        const allUser = await this.userModel.find(searchCondition)
            .skip(skip)
            .limit(limit)
            .exec();
    
        // Count the total number of documents that match the search condition
        const total = await this.userModel
            .find(searchCondition)
            .countDocuments();
    
        // Calculate total pages based on the matching users and limit
        const totalPages = Math.ceil(total / limit);
    
        // Return paginated results
        return {
          total,
          totalPages,
          page,
          limit,
          data: allUser,
        };
    }
    
    
    async deleteUser(userId){
        const deletedUser = await this.userModel.findByIdAndDelete(userId)
      if (!deletedUser) {
        throw new NotFoundException(`Food with ID ${userId} not found`);
      }
      return {message:"deleted Successfully"}
    }
}
