import { Injectable } from '@nestjs/common';
import { DATA } from "./data/data";
import { FindUserDto } from "./dto/find-user.dto";
import { RequestService } from './request.service';

@Injectable()
export class AppService {
  constructor(private readonly requestService: RequestService) {}

  findContact({ email, number }: FindUserDto) {
    return new Promise((resolve) => {
      this.requestService.setRequestTimeout(() => {
        let user = DATA.filter((user) => user.email === email);
        if (number) {
          user = user.filter((user) => user.number === number);
        }
        console.log(number)
          resolve(user);
      }, 5000);
    });
  }
}
