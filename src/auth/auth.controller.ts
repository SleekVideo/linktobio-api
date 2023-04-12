import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { LoginStatus } from 'src/shared/interfaces/login-status';
import { RegistrationStatus } from 'src/shared/interfaces/registration-status';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<RegistrationStatus> {
    const result = await this.authService.register(createUserDto);
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  //   @UseGuards(AuthGuard('local'))
  @Post('login1')
  async login(@Body() loginUserDto: LoginUserDto): Promise<LoginStatus> {
    // return Promise.resolve({
    //   message: 'blla',
    //   success: true,
    // });
    return await this.authService.login(loginUserDto);
  }
  //   @Post('login')
  //   async login() {
  //     return true;
  //   }
}
