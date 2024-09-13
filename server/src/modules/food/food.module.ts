import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { Food, FoodSchema } from '../../core/schemas/food.schema';
import { Category, CategorySchema } from 'src/core/schemas/categories.schema';
import { MulterModule } from '@nestjs/platform-express';
import multer from 'multer';
import { CloudinaryService } from 'src/core/utils/cloudinary/cloudinary.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Food.name, schema: FoodSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [FoodController],
  providers: [FoodService,CloudinaryService],
})
export class FoodModule {}
