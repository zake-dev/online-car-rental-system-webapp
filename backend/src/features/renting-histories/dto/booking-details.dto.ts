import { CustomerDetailsDto } from '@/features/customer-details';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { RentingHistoryDto } from './renting-history.dto';

export class BookingDetailsDto {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RentingHistoryDto)
  rentingHistories: RentingHistoryDto[];

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => CustomerDetailsDto)
  customerDetails: CustomerDetailsDto;

  @IsNotEmpty()
  @IsInt()
  bondAmount: number;
}
