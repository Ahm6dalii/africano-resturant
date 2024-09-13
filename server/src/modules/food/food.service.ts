import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Food } from '../../core/schemas/food.schema';
import { CreateFoodDto } from '../../core/dto/food.dto';
import { UpdateFoodDto } from '../../core/dto/food.dto';
import { Category } from 'src/core/schemas/categories.schema';

@Injectable()
export class FoodService {
  constructor(
    @InjectModel(Food.name) private foodModel: Model<Food>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async create(createFoodDto: CreateFoodDto): Promise<Food> {
    console.log(createFoodDto);
    
    createFoodDto.amount=Math.ceil(createFoodDto.amount)

    const categoryName = await this.categoryModel.findOne({
      name: createFoodDto.category,
    });
    if (!categoryName) {
      throw new HttpException('Category Not Found', HttpStatus.NOT_FOUND);
    }
    createFoodDto.category = categoryName._id;
    return this.foodModel.create(createFoodDto);
  }

  async findAll(
    filters: any,
    page: number = 1,
    limit: number = 10,
  ): Promise<any> {
    const skip = (page - 1) * limit;

    const query: any = {};
    if (filters.category) {
      query.category = filters.category;
    }
    if (filters.name) {
      query.name = { $regex: filters.name, $options: 'i' };
    }
    if (filters.minPrice && filters.maxPrice) {
      query.Price = { $gte: filters.minPrice, $lte: filters.maxPrice };
    }
    const foods = await this.foodModel
      .find()
      .sort({ _id: -1 })

      .skip(skip)
      .limit(limit)
      .populate({ path: 'category', select: 'name' })
      .exec();
    const total = await this.foodModel.countDocuments();

    return {
      total,
      page,
      limit,
      data: foods,
    };
  }

  async findOne(id: string): Promise<Food> {
    const food = await this.foodModel.findById(id).populate('category', 'name');
    if (!food) {
      throw new NotFoundException(`Food with ID ${id} not found`);
    }
    return food;
  }

  async update(id: string, updateFoodDto: UpdateFoodDto): Promise<Food> {
    updateFoodDto.amount=Math.ceil(updateFoodDto.amount)
    const food = await this.foodModel
      .findByIdAndUpdate(id, updateFoodDto, {
        new: true,
      })
      .populate('category', 'name');
    if (!food) throw new NotFoundException(`Food with ID ${id} not found`);
    return food;
  }

  async delete(id: string): Promise<void> {
    const food = await this.foodModel
      .findByIdAndDelete(id)
      .populate('category', 'name');
    if (!food) {
      throw new NotFoundException(`Food with ID ${id} not found`);
    }
  }
}
