import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfileDto } from './dto/user-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private usersRepository: Repository<Profile>,
  ) {}
  async getProfile(slug: string): Promise<UserProfileDto> {
    let profile = await this.usersRepository.findOneBy({ slug: slug });

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
}
