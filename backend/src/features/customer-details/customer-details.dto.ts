import {
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CustomerDetailsDto {
  @IsNotEmpty()
  @IsAlpha()
  @MaxLength(20)
  firstName: string;

  @IsNotEmpty()
  @IsAlpha()
  @MaxLength(20)
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  userEmail: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  addressLine1: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  addressLine2: string;

  @IsNotEmpty()
  @IsAlpha()
  @MaxLength(20)
  suburb: string;

  @IsNotEmpty()
  @IsNumberString()
  @MinLength(4)
  @MaxLength(4)
  postcode: string;

  @IsNotEmpty()
  @IsAlpha()
  @MaxLength(10)
  state: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  paymentType: string;
}
