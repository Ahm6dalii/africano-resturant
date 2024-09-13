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
  BadRequestException
} from '@nestjs/common';
import { FoodService } from './food.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/core/utils/cloudinary/cloudinary.service';

@Controller('api/foods')
export class FoodController {

  constructor(private readonly foodsService: FoodService ,private readonly cloudinaryService: CloudinaryService) {}
   options= {
    width: 1870,
    height: 1250,
    crop:'fill',
    gravity: 'auto',
    folder: 'Africano/Food'
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@Body() foodDto: any,@UploadedFile() file: Express.Multer.File) {
   const foodImage = await this.cloudinaryService.uploadFile(file,this.options).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
    foodDto.image=foodImage.url
    console.log(foodDto)
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
