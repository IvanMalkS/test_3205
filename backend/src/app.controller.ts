import {Body, Controller, Post, ValidationPipe} from '@nestjs/common';
import { AppService } from './app.service';
import {FindUserDto} from "./dto/find-user.dto";

@Controller('contacts')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async findContact(@Body(new ValidationPipe()) findUserDto: FindUserDto) {
    const result = await this.appService.findContact(findUserDto);
    return { data: result };
  }
}
