import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  Headers,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { FoodService } from './food.service';

@Controller('api/foods')
export class FoodController {
  constructor(private readonly foodsService: FoodService) { }

  @Post()
  create(@Body() foodDto: any) {
    return this.foodsService.create(foodDto);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('category') category?: string,
    @Query('name') name?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
  ) {
    const filters = { category, name, minPrice, maxPrice };
    return this.foodsService.findAll(filters, +page, +limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() foodDto: any) {
    return this.foodsService.update(id, foodDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.foodsService.delete(id);
  }

  @Post('/review/:id')
  addReview(@Param('id') id: any, @Body() body: any, @Headers() header) {
    const { token } = header
    if (!token) {
      throw new HttpException('Token not provided', HttpStatus.FORBIDDEN)
    }
    return this.foodsService.addReview(id, body, token)
  }
}
