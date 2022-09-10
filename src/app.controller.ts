import { Controller, Get, Redirect } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
@ApiTags('home')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('/swagger', 301)
  redirectSwagger() {}
  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
