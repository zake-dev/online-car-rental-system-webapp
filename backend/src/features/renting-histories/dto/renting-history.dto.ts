import { IsISO8601, IsInt, IsNotEmpty } from 'class-validator';

export class RentingHistoryDto {
  @IsNotEmpty()
  @IsInt()
  carId: number;

  @IsNotEmpty()
  @IsISO8601()
  rentDate: string;

  @IsNotEmpty()
  @IsISO8601()
  returnDate: string;
}
