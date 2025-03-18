import { Injectable } from '@nestjs/common';
import { CreateS3Dto } from './dto/create-s3.dto';
import { UpdateS3Dto } from './dto/update-s3.dto';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
// import uuidv4 from 'uuid/v4';
@Injectable()
export class S3Service {
   private s3: S3Client;
   private bucketName: string;
 
   constructor(private configService: ConfigService) {
    this.s3 = new S3Client({
       region: this.configService.get<string>('AWS_REGION') ?? 'us-east-1',
       credentials: {
         accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID') ?? '',
         secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY') ?? '',
     },
   });

   this.bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME') ?? '';
   
  }


  async uploadImage(file: Express.Multer.File) {
    const params = {
        Bucket: this.bucketName,
        Key: `${Date.now()}-${file.originalname}`, // Unique filename,
        Body: file.buffer,
        ContentType: file.mimetype,
        Metadata: {
          originalName: file.originalname,
        }
      };

        try {
          await this.s3.send(new PutObjectCommand(params));
          return { message: 'File uploaded successfully', key: params.Key };
        } catch (error) {
          console.error('Error uploading file:', error);
          throw error;
        }
  }

}
  function uuidv4() {
    throw new Error('Function not implemented.');
  }

