import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginStatus } from 'src/shared/interfaces/login-status';
import { RegistrationStatus } from 'src/shared/interfaces/registration-status';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginuserDto: LoginUserDto): Promise<LoginStatus> {
    try {
      const user = await this.userService.findOneByEmail(loginuserDto);
      // generate token
      const token = await this._createToken(user);

      return {
        data: {
          email: user.email,
          token: token,
        },
        success: true,
        message: null,
      };
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  }

  async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
    try {
      await this.userService.create(userDto);
      return {
        success: true,
        message: 'user registered',
      };
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  }

  private async _createToken({ email, id }: UserDto) {
    const accessToken = await this.jwtService.sign(email);

    return {
      expiresIn: process.env.expires_in,
      accessToken,
    };
  }

  async validateUser(payload: {
    token?: string;
    email?: string;
    password?: string;
  }): Promise<UserDto> {
    if (!payload.token && !payload.email) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    if (payload.token) {
      const token = await this.jwtService.verify(payload.token);

      if (!token) {
        throw new HttpException('Token invalid', HttpStatus.UNAUTHORIZED);
      }
    }

    const user = await this.userService.findOneByPayload(payload);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }
}
