import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';

@Module({
  controllers: [CarsController],
  exports: [CarsService],
  providers: [CarsService],
})
export class CarsModule {}
