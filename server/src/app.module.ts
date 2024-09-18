import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

// import { PaymentModule } from './payments/payment/payment.module';
import { PaymobModule } from './payments/paymob/paymob.module';
import { OrderModule } from './payments/order/order.module';
import { CartModule } from './modules/cart/cart.module';
import { AuthModule } from './modules/auth.module';

import { FoodModule } from './modules/food/food.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { NotifictionsModule } from './modules/notifictions/notifictions.module';

import { MulterModule } from '@nestjs/platform-express';
import { CloudinaryModule } from './core/utils/cloudinary/cloudinary.module';
//  adding cart
@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true,  // Makes the configuration available globally
    envFilePath: '.env',  // Specify the .env file
  }) , MulterModule.register({
    dest: './src/uploads', // Specify the destination folder
  }),NotifictionsModule,CloudinaryModule,CartModule,CategoriesModule,AuthModule,FoodModule,PaymobModule,OrderModule,MongooseModule.forRoot("mongodb+srv://ahmedalielian20:C0bvgRQxLNKLlIux@affricano-cluster.4smjx.mongodb.net/affricano?retryWrites=true&w=majority&appName=affricano-cluster")],


  controllers: [AppController],

  providers: [AppService],
})
export class AppModule { }
