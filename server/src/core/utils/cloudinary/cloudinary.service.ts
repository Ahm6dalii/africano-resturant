import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-response';
import * as streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  uploadFile(
    file: Express.Multer.File,
    options?: {
      width?: number;
      height?: number;
      crop?: string;
      gravity?: string;
      folder?: string;  
    }
  ): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadOptions = {
        width: options?.width || undefined,
        height: options?.height || undefined,
        crop: options?.crop || 'fill', // Default crop mode
        gravity: options?.gravity || 'center', // Default gravity
      folder: options.folder || 'default_folder'
      };
      console.log(file,"ssfdfdsddsds");
      


      const uploadStream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
