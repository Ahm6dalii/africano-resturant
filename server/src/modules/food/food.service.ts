import {
  BadRequestException,
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
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly notificationService: NotifictionsService,
    private readonly notificationGateway: NotifictionsGateway,
    private _jwtservice: JwtService
    ,private readonly cloudinaryService: CloudinaryService
  ) { }

  options= {
    width: 1870,
    height: 1250,
    crop:'fill',
    gravity: 'auto',
    folder: 'Africano/Test'
  }

  async create(createFoodDto: CreateFoodDto,file:any): Promise<Food> {
    console.log(createFoodDto);
    
    createFoodDto.amount=Math.ceil(createFoodDto.amount)

    const categoryName = await this.categoryModel.findOne({
      name: createFoodDto.category,
    });
    if (!categoryName) {
      throw new HttpException('Category Not Found', HttpStatus.NOT_FOUND);
    }
    createFoodDto.category = categoryName._id;

    //Upload Img
    const foodImage = await this.cloudinaryService.uploadFile(file,this.options).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
    
    createFoodDto.image=foodImage.url;
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

  async update(id: string, updateFoodDto: UpdateFoodDto,file:any) {
    console.log(updateFoodDto);
    if(updateFoodDto.amount){
      updateFoodDto.amount=Math.ceil(Number(updateFoodDto.amount))
    }
    const foodImage = await this.cloudinaryService.uploadFile(file,this.options).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
    updateFoodDto.image=foodImage.url
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




  async addReview(id: any, body: any, token) {
    const { text } = body

    try {
      const decoded = this._jwtservice.verify(token, { secret: "mo2" });
      if (!decoded) {
        throw new HttpException('invalid token', HttpStatus.FORBIDDEN);
      }
      const { userId } = decoded
      const food = await this.foodModel.findById(id).exec();
      if (!food) {
        throw new Error('Food not found');
      }
      const newReview = { text: body.text, user: userId };
      const addedReview = await this.foodModel
        .findByIdAndUpdate(id, { $push: { review: newReview } }, { new: true }).populate('review.user', 'name').exec();
      const users = await this.userModel.find().exec();
      const notifications = users.map(user => ({
        user: user._id,
        type: 'review_added',
        relatedId: addedReview._id,
        message: `A new review was added to the article: ${addedReview.name} by ${addedReview.review[0].user.name}`,
      }));
      await this.notificationService.createNotification(notifications);
      this.notificationGateway.sendNotificationToAll(notifications);
      return { message: 'Review added successfully', addedReview, notifications };
    } catch (error) {
      console.log(error);
      throw new HttpException('Error adding review', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


}
