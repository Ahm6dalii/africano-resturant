import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { Food, FoodSchema } from '../../core/schemas/food.schema';
import { Category, CategorySchema } from 'src/core/schemas/categories.schema';
import { User, UserSchema } from 'src/core/schemas/user.schema';
import { NotifictionsModule } from '../notifictions/notifictions.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [NotifictionsModule,
    MongooseModule.forFeature([
      { name: Food.name, schema: FoodSchema },
      { name: Category.name, schema: CategorySchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [FoodController],
  providers: [FoodService, JwtService],
})
export class FoodModule { }
