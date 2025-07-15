import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Inject, Injectable } from '@nestjs/common';
import { FileUploadService } from 'src/domain/common/file-uploader/file-upload.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class S3FileUploadService implements FileUploadService {
  constructor(@Inject('S3_CLIENT') private readonly s3: S3Client) {}

  async uploadFile(file: string): Promise<string> {
    const matches = file.match(/^data:(.+);base64,(.+)$/);

    if (!matches) {
      throw new Error('Invalid base64 string');
    }

    const mimeType = matches[1];
    const extenstion = mimeType.split('/')[1];
    const buffer = Buffer.from(matches[2], 'base64');
    const key = `chat/${uuidv4()}.${extenstion}`;
    const BUCKET_NAME = process.env.S3_BUCKET_NAME;

    await this.s3.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: mimeType,
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
