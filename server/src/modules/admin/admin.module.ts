import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin, AdminSchema } from 'src/core/schemas/admin.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/core/gaurds/jwt.strategy';
import { LogService } from '../log/log.service';
import { Log, LogSchema } from 'src/core/schemas/log.schema';

@Module({
  imports:[MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema },{ name: Log.name, schema: LogSchema },]),
  PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register({
    secret: 'adax', 
    signOptions: { expiresIn: '60m' }
  }),
],
  controllers: [AdminController],
  providers: [AdminService,JwtService,JwtStrategy,LogService],
})
export class AdminModule {}
