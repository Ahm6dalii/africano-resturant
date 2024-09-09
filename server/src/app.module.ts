import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
// import { PaymentModule } from './payments/payment/payment.module';
import { PaymobModule } from './payments/paymob/paymob.module';
import { OrderModule } from './payments/order/order.module';
@Module({
  imports: [PaymobModule,OrderModule,MongooseModule.forRoot("mongodb+srv://ahmedalielian20:C0bvgRQxLNKLlIux@affricano-cluster.4smjx.mongodb.net/affricano?retryWrites=true&w=majority&appName=affricano-cluster")],
controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
