import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './../../core/schemas/categories.schema';
import { Model } from 'mongoose';
import { CreateCategoryDto, UpdateCategoryDto } from './../../core/dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find();
  }
  async findById(id: string): Promise<Category> {
    return this.categoryModel.findById(id);
  }
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryModel.create(createCategoryDto);
  }
  async update(id: string, updateCategoryDto: any): Promise<Category> {
    const updatedCategory = await this.categoryModel.findByIdAndUpdate(
      id,
      updateCategoryDto,
      { new: true },
    );
    if (!updatedCategory) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return updatedCategory;
    }
    async delete(id: string): Promise<Category>{
        const deleteCategory = await this.categoryModel.findByIdAndDelete(id); 
        if (!deleteCategory) {
            throw new NotFoundException(`Category with id ${id} not found`);
        }
        return deleteCategory; 
    }
}
