import { Module } from '@nestjs/common';
import { FILE_SERVICE } from 'src/domain/common/file/file.service';
import { S3FileUploadService } from '../../infrastructure/s3/s3-file-uploader.service';
import { S3Client } from '@aws-sdk/client-s3';
import { FileController } from './file.controller';

@Module({
  controllers: [FileController],
  providers: [
    {
      provide: FILE_SERVICE,
      useClass: S3FileUploadService,
    },
    {
      provide: 'S3_CLIENT',
      useFactory: () => {
        return new S3Client({
          region: process.env.AWS_REGION!,
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
          },
        });
      },
    },
  ],
  exports: [FILE_SERVICE, 'S3_CLIENT'],
})
export class FileModule {}
