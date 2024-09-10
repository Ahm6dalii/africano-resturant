import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { Food, FoodSchema } from '../../core/schemas/food.schema';
import { Category, CategorySchema } from 'src/core/schemas/categories.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Food.name, schema: FoodSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [FoodController],
  providers: [FoodService],
})
export class FoodModule {}
