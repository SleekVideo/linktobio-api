import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { UploadAvatarDto } from './dto/upload-avatar.dto';
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

  @Post('upload-avatar')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @Body() data: UploadAvatarDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(data, file);
    return { data };
    // return await this._profileService.uploadAvatar(data.slug, file);
  }
}
