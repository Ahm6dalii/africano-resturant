import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  UseGuards,
  SetMetadata,
  Query,
  Req,
} from '@nestjs/common';

import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { JwtAuthGuard } from 'src/core/gaurds/jwt-auth.guard';
import { PermissionsGuard } from 'src/core/gaurds/permissions.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Post('signin')
  signIn(@Body() body: { username: string; password: string }) {
    return this.adminService.signIn(body.username, body.password);
  }
  @Post('create')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @SetMetadata('permissions', ['createAdmin'])
  createAdmin(@Req() req: any, @Body() createAdminDto: CreateAdminDto) {
    const adminId = req.user.userId; // Extract the adminId from the request
    return this.adminService.createAdmin(createAdminDto, adminId);
  }

  @Get('all')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @SetMetadata('permissions', ['viewAdmins'])
  getAllAdmins(
    @Query('search') search: string,
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
  ) {
    return this.adminService.getAllAdmins(search, page, limit);
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @SetMetadata('permissions', ['deleteAdmin'])
  deleteAdmin(@Req() req, @Param('id') id: string) {
    const adminId = req.user.userId; // Extract the adminId from the request
    return this.adminService.deleteAdmin(id, adminId);
  }

  @Patch('update/:id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @SetMetadata('permissions', ['updateAdmin'])
  updateAdmin(
    @Req() req,
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    const adminId = req.user.userId; // Extract the adminId from the request
    return this.adminService.updateAdmin(id, updateAdminDto, adminId);
  }
  @Patch('update-pass')
  @UseGuards(JwtAuthGuard)
  updateAdminPass(@Req() req, @Body() body: { password: string }) {
    const userId = req.user.userId;
    // console.log(userId)
    // console.log(req.user);
    const { password } = body;

    return this.adminService.updateAdminPass(userId, password);
  }
}
