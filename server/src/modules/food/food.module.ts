import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { Food, FoodSchema } from '../../core/schemas/food.schema';
import { Category, CategorySchema } from 'src/core/schemas/categories.schema';
import { User, UserSchema } from 'src/core/schemas/user.schema';
import { NotifictionsModule } from '../notifictions/notifictions.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import multer from 'multer';
import { CloudinaryService } from 'src/core/utils/cloudinary/cloudinary.service';
import { JwtStrategy } from 'src/core/gaurds/jwt.strategy';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports: [NotifictionsModule,
    MongooseModule.forFeature([
      { name: Food.name, schema: FoodSchema },
      { name: Category.name, schema: CategorySchema },
      { name: User.name, schema: UserSchema },
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'adax', 
      signOptions: { expiresIn: '60m' }
    }),
  ],
  controllers: [FoodController],

  providers: [FoodService,CloudinaryService,JwtService,JwtStrategy],
})
export class FoodModule { }
