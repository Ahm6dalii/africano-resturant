import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [MongooseModule.forRoot("mongodb+srv://ahmedalielian20:C0bvgRQxLNKLlIux@affricano-cluster.4smjx.mongodb.net/affricano?retryWrites=true&w=majority&appName=affricano-cluster")],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
