import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { toUserDto } from 'src/shared/mapper';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { default as bcrypt } from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const { email, firstName, lastName, password } = createUserDto;

    // check if user exists in db
    const userInDb = await this.usersRepository.findOne({
      where: { email },
    });

    if (userInDb) {
      throw new HttpException(
        'A user with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user: User = await this.usersRepository.create({
      email,
      firstName,
      lastName,
      password,
    });

    await this.usersRepository.save(user);

    return toUserDto(user);
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(options?: any): Promise<UserDto> {
    const user = await this.usersRepository.findOne(options);
    return toUserDto(user);
  }

  async findOneByEmail({ email, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('Email not found', HttpStatus.UNAUTHORIZED);
    }
    // compare passwords
    const areEqual = await this.comparePasswords(user.password, password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return toUserDto(user);
  }
  async findOneByPayload({ email }: any): Promise<UserDto> {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    return toUserDto(user);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async comparePasswords(hashedPw, pw) {
    return bcrypt.compare(pw, hashedPw);
  }
}
