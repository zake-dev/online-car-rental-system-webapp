import { CustomerDetails } from '@/features/customer-details';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentingHistoriesController } from './renting-histories.controller';
import { RentingHistoriesService } from './renting-histories.service';
import { RentingHistory } from './renting-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RentingHistory, CustomerDetails])],
  providers: [RentingHistoriesService],
  controllers: [RentingHistoriesController],
})
export class RentingHistoriesModule {}
