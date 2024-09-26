import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Admin } from 'src/core/schemas/admin.schema';
import { LogService } from '../log/log.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    private jwtService: JwtService ,
    private logService: LogService,
  ) { }

  async createAdmin(createAdminDto: CreateAdminDto, adminId: string): Promise<Admin> {
    const { username, ...rest } = createAdminDto;

    const existingAdmin = await this.adminModel.findOne({ username }).exec();
    if (existingAdmin) {
      throw new ConflictException('Username already exists');
    }

    const newAdmin = new this.adminModel({
      ...rest,
      username,
    });

    await newAdmin.save();
    
    // Log the admin creation action
    await this.logService.createLog(`Created admin ${newAdmin.username}`, adminId);

    return newAdmin;
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
      ? { username: { $regex: search, $options: 'i' } } 
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

  async updateAdmin(id: string, updateAdminDto: UpdateAdminDto, adminId: string): Promise<Admin> {
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
    
    // Log the admin update action
    await this.logService.createLog(`Updated admin ${updatedAdmin.username}`, adminId);

    return updatedAdmin;
  }

  async updateAdminPass(id: string, newPassword: string): Promise<any> {
    const admin = await this.adminModel.findById(id);
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    admin.password = newPassword;
    admin.save();
    return {message:"password updated successfully"}
  }

  async deleteAdmin(id: string, adminId: string): Promise<void> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }
    const result = await this.adminModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }

    // Log the admin deletion action
    await this.logService.createLog(`Deleted admin ${result.username}`, adminId);
  }
}
