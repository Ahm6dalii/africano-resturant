import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './../../core/schemas/categories.schema';
import { Model } from 'mongoose';
import { CreateCategoryDto, UpdateCategoryDto } from './../../core/dto/category.dto';
import { CloudinaryService } from 'src/core/utils/cloudinary/cloudinary.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  options = {
    width: 1870,
    height: 1250,
    crop: 'fill',
    gravity: 'auto',
    folder: 'Africano/catogery',
  };

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find();
  }
  async findById(id: string): Promise<Category> {
    return this.categoryModel.findById(id);
  }
  async create(
    createCategoryDto: CreateCategoryDto,
    file: any,
  ): Promise<Category> {
    const categoryName = await this.categoryModel.findOne({
      name: createCategoryDto.name,
    });
    if (categoryName) {
      throw new HttpException('Category Already exist', HttpStatus.CONFLICT);
    }
    const foodImage = await this.cloudinaryService
      .uploadFile(file, this.options)
      .catch(() => {
        throw new BadRequestException('Invalid file type.');
      });

    createCategoryDto.image = foodImage.url;

    return this.categoryModel.create(createCategoryDto);
  }
  async update(
    id: string,
    updateCategoryDto: any,
    file: Express.Multer.File,
  ): Promise<Category> {
    let updateData = { ...updateCategoryDto };

    if (file) {
      try {
        console.log('Uploading file:', file.originalname);
        const foodImage = await this.cloudinaryService.uploadFile(
          file,
          this.options,
        );
        updateData.image = foodImage.url;
        console.log('New image URL:', foodImage.url);
      } catch (error) {
        console.error('Error uploading file:', error);
        throw new BadRequestException('Error uploading file: ' + error.message);
      }
    }

    console.log('Updating category with data:', updateData);

    const updatedCategory = await this.categoryModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true },
    );

    if (!updatedCategory) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    console.log('Updated category:', updatedCategory);

    return updatedCategory;
  }

  async delete(id: string): Promise<Category> {
    const deleteCategory = await this.categoryModel.findByIdAndDelete(id);
    if (!deleteCategory) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return deleteCategory;
  }
}
