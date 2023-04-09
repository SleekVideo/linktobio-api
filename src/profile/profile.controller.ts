import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProfileService } from './profile.service';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly _profileService: ProfileService) {}
  @Get('/:slug')
  async findBySlug(@Param('slug') slug: string) {
    const profile = await this._profileService.getProfile(slug);
    if (!profile) {
      return new NotFoundException();
    }
    return profile;
  }
}
