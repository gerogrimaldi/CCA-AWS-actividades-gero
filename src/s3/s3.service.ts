import { Injectable } from '@nestjs/common';
import { CreateS3Dto } from './dto/create-s3.dto';
import { UpdateS3Dto } from './dto/update-s3.dto';

@Injectable()
export class S3Service {
  constructor() {}

  uploadImage(createS3Dto: CreateS3Dto) {
    return 'This action adds a new s3';
  }

}
