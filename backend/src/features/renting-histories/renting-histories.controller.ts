import { Controller, Get, Query } from '@nestjs/common';
import { RentingHistoriesService } from './renting-histories.service';

@Controller('renting-history')
export class RentingHistoriesController {
  constructor(private rentingHistoriesService: RentingHistoriesService) {}

  @Get('/')
  findRentingHistories(@Query('email') email: string) {
    return this.rentingHistoriesService.findRentingHistories(email);
  }

  @Get('/bond-amount')
  calculateBondAmount(@Query('email') email: string) {
    return this.rentingHistoriesService.calculateBondAmount(email);
  }
}
