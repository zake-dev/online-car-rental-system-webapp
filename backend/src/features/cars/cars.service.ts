import * as CARS from '@/db/cars.json';
import { RentingHistoryDto } from '@/features/renting-histories';
import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class CarsService {
  async updateCarsStatus(rentingHistories: RentingHistoryDto[]) {
    const updatedCars = [...CARS];
    rentingHistories.forEach((rentingHistory) => {
      const rentDate = new Date(rentingHistory.rentDate);
      const returnDate = new Date(rentingHistory.returnDate);
      const rentalDay =
        (returnDate.getTime() - rentDate.getTime()) / (1000 * 60 * 60 * 24);

      const targetCar = updatedCars.find(
        (car) => car.id === rentingHistory.carId,
      );
      if (targetCar) {
        targetCar.mileage += rentalDay * 300;
        targetCar.availability = false;
      }
    });

    await writeFile(
      join(process.cwd(), 'src', 'db', 'cars.json'),
      JSON.stringify(updatedCars),
    );
  }
}
