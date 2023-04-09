import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUploadService } from 'src/common/file-upload.service';
import { Repository } from 'typeorm';
import { UserProfileDto } from './dto/user-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    private fileUploadService: FileUploadService,
  ) {}
  async getProfile(slug: string): Promise<UserProfileDto> {
    const profile = await this.profileRepository.findOneBy({ slug: slug });

    if (!profile) {
      return null;
    }
    return {
      facebookUrl: profile.facebook,
      instagramUrl: profile.instagram,
      twitterUrl: profile.twitter,
      tiktokUrl: profile.tiktok,
      youtubeUrl: profile.youtube,
    };
  }

  async uploadAvatar(slug: string, file: Express.Multer.File) {
    try {
      const downloadUrl = await this.fileUploadService.upload(file);
      if (downloadUrl) {
        await this.profileRepository.update(
          { slug },
          { avatarUrl: downloadUrl },
        );
      }
      return downloadUrl;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }
}
