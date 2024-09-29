import { Body, Controller, Delete, Get, Headers, HttpException, HttpStatus, Param, Query } from '@nestjs/common';
import { UserDashboardService } from './user-dashboard.service';

@Controller('user-dashboard')
export class UserDashboardController {
  constructor(private readonly _userDashboardService: UserDashboardService) {


  }
  @Get()
  getAllUser(@Headers() header, @Query('search') search: string,
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1) {
    const { token } = header

    if (!token) {
      throw new HttpException('Token not provided', HttpStatus.FORBIDDEN);
    }
    return this._userDashboardService.getAllUser(search, limit, page)
  }


  @Delete(':id')
  delete(@Param('id') id: string, @Headers() header) {
    const { token } = header
    console.log(token);
    if (!token) {
      throw new HttpException('Token not provided', HttpStatus.FORBIDDEN);
    }
    return this._userDashboardService.deleteUser(id);
  }


}
