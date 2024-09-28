import { BadRequestException, Body, Controller, Delete, Get, Param, Post , Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/core/utils/cloudinary/cloudinary.service';

@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findById(id);
  }
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() categroyDto: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.categoryService.create(categroyDto, file);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @Body() categoryDto: any,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.categoryService.update(id, categoryDto, file);
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.categoryService.delete(id);
  }
}
