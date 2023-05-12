import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { RentingHistory } from './renting-history.entity';

@Injectable()
export class RentingHistoriesService {
  constructor(
    @InjectRepository(RentingHistory)
    private rentingHistoriesRepository: Repository<RentingHistory>,
  ) {}

  async calculateBondAmount(email: string): Promise<number> {
    const hasRecentHistory = await this.rentingHistoriesRepository.findOne({
      where: {
        userEmail: email,
        returnDate: MoreThan(
          new Date(
            new Date().getFullYear(),
            new Date().getMonth() - 3,
            new Date().getDate(),
          ),
        ),
      },
    });

    return hasRecentHistory ? 0 : 200;
  }
}
