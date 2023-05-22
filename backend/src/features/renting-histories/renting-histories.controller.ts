import { CarsService } from '@/features/cars';
import { BookingDetailsDto } from '@/features/renting-histories/dto/booking-details.dto';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { RentingHistoriesService } from './renting-histories.service';

@Controller('renting-histories')
export class RentingHistoriesController {
  constructor(
    private rentingHistoriesService: RentingHistoriesService,
    private carsService: CarsService,
  ) {}

  @Get('/')
  findRentingHistories(@Query('email') email: string) {
    return this.rentingHistoriesService.findRentingHistories(email);
  }

  @Post('/')
  async recordRentingHistories(
    @Body() bookingDetailsDto: BookingDetailsDto,
    @Res() res: Response,
  ) {
    await Promise.allSettled([
      this.rentingHistoriesService.recordRentingHistories(bookingDetailsDto),
      this.carsService.updateCarsStatus(bookingDetailsDto.rentingHistories),
    ]);
    res.status(HttpStatus.CREATED).send();
  }

  @Get('/bond-amount')
  calculateBondAmount(@Query('email') email: string) {
    return this.rentingHistoriesService.calculateBondAmount(email);
  }

  @Get('/:id')
  findRentingHistory(@Param('id') id: number) {
    return this.rentingHistoriesService.findRentingHistory(id);
  }
}
