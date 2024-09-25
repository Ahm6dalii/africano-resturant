import { Controller, Get, SetMetadata, UseGuards } from '@nestjs/common';
import { LogService } from './log.service';
import { JwtAuthGuard } from 'src/core/gaurds/jwt-auth.guard';
import { PermissionsGuard } from 'src/core/gaurds/permissions.guard';

@Controller('logs')
export class LogController {
  constructor(private readonly logService: LogService) {}
  @Get('')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @SetMetadata('permissions', ['viewLogs'])
  getAllLogs() {
    return this.logService.getAllLogs();
  }
}
