import { Module } from '@nestjs/common';
import { FILE_UPLOAD_SERVICE } from 'src/domain/common/file-uploader/file-upload.service';
import { S3FileUploadService } from './s3-file-uploader.service';
import { S3Client } from '@aws-sdk/client-s3';

@Module({
  providers: [
    {
      provide: FILE_UPLOAD_SERVICE,
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
  exports: [FILE_UPLOAD_SERVICE, 'S3_CLIENT'],
})
export class S3FileuploadModule {}
