import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return cloudinary.config({
      cloud_name: 'dbifogzji', 
      api_key: '327869157563271', 
      api_secret: 'ryj3rsHXH8Rec1y6rnaluPjX1yg' 

      // cloud_name: configService.get<string>('CLOUDINARY_NAME'),
      // api_key: configService.get<string>('CLOUDINARY_API_KEY'),
      // api_secret: configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  },
};
