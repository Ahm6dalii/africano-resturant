import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Log, LogSchema } from 'src/core/schemas/log.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[MongooseModule.forFeature([{ name: Log.name, schema: LogSchema },]),
  PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register({
    secret: 'adax', 
    signOptions: { expiresIn: '60m' }
  }),
],
  controllers: [LogController],
  providers: [LogService],
})
export class LogModule {}
