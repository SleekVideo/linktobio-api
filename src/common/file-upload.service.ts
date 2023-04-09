import { S3, S3Control } from 'aws-sdk';
import { Logger, Injectable, Inject } from '@nestjs/common';

@Injectable()
export class FileUploadService {
  private s3: S3;
  constructor() {
    this.s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }
  async upload(file: Express.Multer.File) {
    const { filename } = file;
    const s3Bucket = 'linktobio';
    const prefix = 'avatar';

    const downloadUrl = await this.uploadS3(
      file.buffer,
      s3Bucket,
      prefix,
      'profile.jpg',
    );
    return downloadUrl;
  }

  async uploadS3(
    buffer: Buffer,
    s3Bucket: string,
    prefix,
    fileName,
  ): Promise<string> {
    const params = {
      Bucket: s3Bucket,
      Key: String(prefix + '/' + fileName),
      Body: buffer,
      ACL: 'public',
    };

    return new Promise((resolve, reject) => {
      this.s3.upload(params, (err, data: S3.ManagedUpload.SendData) => {
        if (err) {
          Logger.error(err);
          reject(err.message);
        }
        return `https://${data.Bucket}.s3.amazonaws.com/${prefix}/${fileName}`;
      });
    });
  }
}
