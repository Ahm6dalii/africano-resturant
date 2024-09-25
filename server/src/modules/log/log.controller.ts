import { Controller, Get, Query, SetMetadata, UseGuards } from '@nestjs/common';
import { LogService } from './log.service';
import { JwtAuthGuard } from 'src/core/gaurds/jwt-auth.guard';
import { PermissionsGuard } from 'src/core/gaurds/permissions.guard';

@Controller('logs')
export class LogController {
  constructor(private readonly logService: LogService) {}
  @Get('')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @SetMetadata('permissions', ['viewLogs'])
  getAllLogs(@Query('search') search: string,
  @Query('limit') limit: number = 10,
  @Query('page') page: number = 1,) {
    return this.logService.getAllLogs(search, page, limit);
  }
}
