import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Inject, Injectable } from '@nestjs/common';
import { FileService } from 'src/domain/common/file/file.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class S3FileUploadService implements FileService {
  constructor(@Inject('S3_CLIENT') private readonly s3: S3Client) {}

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const extension = file.originalname.split('.').pop();
    const key = `chat/${uuidv4()}.${extension}`;
    const BUCKET_NAME = process.env.S3_BUCKET_NAME;

    await this.s3.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );

    const url = await getSignedUrl(
      this.s3,
      new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
      }),
      {
        expiresIn: 60 * 60 * 24 * 7,
      }
    );

    return url;
  }
}
