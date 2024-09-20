import { Controller, Post, Body, Get, Param, Delete, Patch, UseGuards, SetMetadata } from '@nestjs/common';
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
  createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto);
  }

  @Get('all')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @SetMetadata('permissions', ['viewAdmins'])
  getAllAdmins() {
    return this.adminService.getAllAdmins();
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @SetMetadata('permissions', ['deleteAdmin'])  
  deleteAdmin(@Param('id') id: string) {
    return this.adminService.deleteAdmin(id);
  }

  // تحديث مشرف
  @Patch('update/:id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @SetMetadata('permissions', ['updateAdmin'])  
  updateAdmin(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.updateAdmin(id, updateAdminDto);
  }
}