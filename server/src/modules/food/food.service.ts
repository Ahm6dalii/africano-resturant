import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Food } from '../../core/schemas/food.schema';
import { CreateFoodDto } from '../../core/dto/food.dto';
import { UpdateFoodDto } from '../../core/dto/food.dto';
import { Category } from 'src/core/schemas/categories.schema';
import { User } from 'src/core/schemas/user.schema';
import { NotifictionsGateway } from '../notifictions/notifictions.gateway';
import { NotifictionsService } from '../notifictions/notifictions.service';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryService } from 'src/core/utils/cloudinary/cloudinary.service';

@Injectable()
export class FoodService {
  constructor(
    @InjectModel(Food.name) private foodModel: Model<Food>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    private _jwtservice: JwtService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly notificationGateway: NotifictionsGateway,
  ) { }

  options = {
    width: 1870,
    height: 1250,
    crop: 'fill',
    gravity: 'auto',
    folder: 'Africano/Test',
  };

  async create(createFoodDto: any, file: any): Promise<Food> {
    console.log(createFoodDto);

    createFoodDto.amount = JSON.parse(createFoodDto.amount);
    createFoodDto.name = JSON.parse(createFoodDto.name);
    createFoodDto.description = JSON.parse(createFoodDto.description);

    const categoryName = await this.categoryModel.findOne({
      'name.en': createFoodDto.category,
      // 'name.ar': createFoodDto.category,
    });

    if (!categoryName) {
      throw new HttpException('Category Not Found', HttpStatus.NOT_FOUND);
    }
    createFoodDto.category = categoryName._id;

    //Upload Img
    const foodImage = await this.cloudinaryService
      .uploadFile(file, this.options)
      .catch(() => {
        throw new BadRequestException('Invalid file type.');
      });

    createFoodDto.image = foodImage.url;
    return this.foodModel.create(createFoodDto);
  }

  async findAll(
    filters: any,
    page: number = 1,
    limit: number = 10,
  ): Promise<any> {
    const skip = (page - 1) * limit;

    const query: any = {};
    console.log(filters.category);

    let categoryObjectId = new Types.ObjectId(filters.category);
    console.log(categoryObjectId);
    if (filters.category) {
      query.category = categoryObjectId;
      return await this.foodModel.find({ category: categoryObjectId });
    }
    if (filters.name) {
      query.name = { $regex: filters.name, $options: 'i' };
    }
    if (filters.minPrice && filters.maxPrice) {
      query.Price = { $gte: filters.minPrice, $lte: filters.maxPrice };
    }
    const foods = await this.foodModel
      .find()
      .sort({ _id: 1 })
      .skip(skip)
      .limit(limit)
      .populate({ path: 'category', select: 'name' })
      .populate('review.user', 'name image')
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
    const food = await this.foodModel
      .findById(id)
      .populate('category', 'name')
      .populate('review.user', 'name image');
    if (!food) {
      throw new NotFoundException(`Food with ID ${id} not found`);
    }
    return food;
  }

  async update(id: string, updateFoodDto: any, file: any) {
    updateFoodDto.amount = JSON.parse(updateFoodDto.amount);
    updateFoodDto.name = JSON.parse(updateFoodDto.name);
    updateFoodDto.description = JSON.parse(updateFoodDto.description);
    const categoryName = await this.categoryModel.findOne({
      'name.en': updateFoodDto.category,
      // 'name.ar': createFoodDto.category,
    });

    if (!categoryName) {
      throw new HttpException('Category Not Found', HttpStatus.NOT_FOUND);
    }
    if (file) {
      const foodImage = await this.cloudinaryService
        .uploadFile(file, this.options)
        .catch(() => {
          throw new BadRequestException('Invalid file type.');
        });
      updateFoodDto.image = foodImage.url;
    }
    if (updateFoodDto.category) {

      updateFoodDto.category = categoryName._id;
    }

    const food = await this.foodModel
      .findByIdAndUpdate(id, updateFoodDto, {
        new: true,
      })
      .populate('category', 'name');
    if (!food) throw new NotFoundException(`Food with ID ${id} not found`);
    return food;
  }

  async delete(id: string): Promise<object> {
    const food = await this.foodModel
      .findByIdAndDelete(id)
      .populate('category', 'name');
    if (!food) {
      throw new NotFoundException(`Food with ID ${id} not found`);
    }
    return { message: "deleted Successfully" }
  }

  async findAllByCategory(category: any, limit: number, page: number) {
    // Extract category from query parameters

    if (!category) {
      throw new BadRequestException('Category ID is required');
    }

    const skip = (page - 1) * limit; // Pagination logic
    const categoryObjectId = new Types.ObjectId(category);

    const items = await this.foodModel
      .find({ category: categoryObjectId })
      .skip(skip)
      .limit(limit)
      .populate({ path: 'category', select: 'name' })
      .exec();
    const total = await this.foodModel
      .find({ category: categoryObjectId })
      .countDocuments();

    const totalPages = Math.ceil(total / limit);

    // return items;
    return {
      total,
      totalPages,
      page,
      limit,
      data: items,
    };
  }

  async addReview(id: any, body: any, token, req) {
    const { text } = body;

    try {
      const decoded = this._jwtservice.verify(token, { secret: 'mo2' });
      if (!decoded) {
        throw new HttpException('invalid token', HttpStatus.FORBIDDEN);
      }
      const { userId } = decoded;
      const food = await this.foodModel.findById(id).exec();
      if (!food) {
        throw new Error('Food not found');
      }
      console.log(body, 'body');

      const newReview = { text, user: userId };
      const addedReview = await this.foodModel
        .findByIdAndUpdate(id, { $push: { review: newReview } }, { new: true })
        .populate('review.user', 'name')
        .exec();

      this.notificationGateway.sendNewReviewToAll(addedReview.review[addedReview.review.length - 1]);

      return { message: 'Review added successfully', addedReview };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error adding review',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
