import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: false })
  @IsNotEmpty()
  firstName: string;
  @ApiProperty({ required: false })
  @IsNotEmpty()
  lastName: string;
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty({ required: true })
  @IsNotEmpty()
  password: string;
}
