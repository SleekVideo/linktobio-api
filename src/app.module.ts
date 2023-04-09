import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Profile } from './profile/entities/profile.entity';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:"postgres",
      host:"localhost",
      port: 3306,
      username:"root",
      password:"1234",
      database:"linktobio",
      entities:[User,Profile],
      synchronize:true,
    })
    AuthModule,
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
