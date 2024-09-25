import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Admin } from 'src/core/schemas/admin.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    private jwtService: JwtService
  ) { }

  async createAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
    const { username, ...rest } = createAdminDto;

    const existingAdmin = await this.adminModel.findOne({ username }).exec();
    if (existingAdmin) {
      throw new ConflictException('Username already exists');
    }

    const newAdmin = new this.adminModel({
      ...rest,
      username,
    });

    return newAdmin.save();
  }


  async signIn(username: string, password: string): Promise<{ token: string }> {
    const admin = await this.adminModel.findOne({ username });

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      throw new NotFoundException('Invalid credentials');
    }

    const token = this.jwtService.sign({ username: admin.username, userId:admin._id,permissions: admin.permissions, isSuperAdmin: admin.isSuperAdmin }, { secret: "adax" });
    return { token };
  }

  async getAllAdmins(search,page,limit): Promise<any> {
    const skip = (page - 1) * limit;
    
    const searchCondition = search
      ? { name: { $regex: search, $options: 'i' } } 
      : {}; 
    const allAdmin= await this.adminModel.find(searchCondition)
        .skip(skip)
        .limit(limit)
        .exec();

    const total = await this.adminModel
        .find(searchCondition)
        .countDocuments();

    const totalPages = Math.ceil(total / limit);

    return {
      total,
      totalPages,
      page,
      limit,
      data: allAdmin,
    };
  }

  async updateAdmin(id: string, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }
    if (updateAdminDto.password) {
      updateAdminDto.password = await bcrypt.hash(updateAdminDto.password, 10);
    }
    if (updateAdminDto.username) {
      const existingAdmin = await this.adminModel.findOne({ username: updateAdminDto.username }).exec();

      if (existingAdmin && existingAdmin._id.toString() !== id) {
        throw new ConflictException('Username already exists');
      }
    }
    const updatedAdmin = await this.adminModel.findByIdAndUpdate(id, updateAdminDto, { new: true }).exec();
    if (!updatedAdmin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }
    return updatedAdmin;
  }


  async deleteAdmin(id: string): Promise<void> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }
    const result = await this.adminModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }
  }
}
