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
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Patch
} from '@nestjs/common';
import { FoodService } from './food.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/core/utils/cloudinary/cloudinary.service';

@Controller('api/foods')
export class FoodController {

  constructor(private readonly foodsService: FoodService ,private readonly cloudinaryService: CloudinaryService) {}
  

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@Body() foodDto: any,@UploadedFile() file: Express.Multer.File) {
    return this.foodsService.create(foodDto,file);
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

  @Get('cat')
  async findAllByCategory(
    @Query('category') category: string,
    @Query('limit') limit: number =10,
    @Query('page') page: number = 1,
  ) {
    return this.foodsService.findAllByCategory(category , limit, page);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodsService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(@Param('id') id: string, @Body() foodDto: any,@UploadedFile() file: Express.Multer.File) {

    return this.foodsService.update(id, foodDto,file);
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
