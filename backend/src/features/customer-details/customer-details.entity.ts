import { RentingHistory } from '@/features/renting-histories';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CustomerDetailsDto } from './customer-details.dto';

@Entity('CUSTOMER_DETAILS')
export class CustomerDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'FIRST_NAME', type: 'varchar', length: 20 })
  firstName: string;

  @Column({ name: 'LAST_NAME', type: 'varchar', length: 20 })
  lastName: string;

  @Column({ name: 'ADDRESS_LINE_1', type: 'varchar', length: 255 })
  addressLine1: string;

  @Column({ name: 'ADDRESS_LINE_2', type: 'varchar', length: 255 })
  addressLine2: string;

  @Column('varchar', { length: 20 })
  suburb: string;

  @Column('varchar', { length: 4 })
  postcode: string;

  @Column('varchar', { length: 10 })
  state: string;

  @Column({ name: 'PAYMENT_TYPE', type: 'varchar', length: 10 })
  paymentType: string;

  @OneToMany(
    () => RentingHistory,
    (rentingHistory) => rentingHistory.customerDetails,
  )
  rentingHistories: RentingHistory[];

  static from(customerDetailsDto: CustomerDetailsDto) {
    const customerDetails = new CustomerDetails();
    customerDetails.firstName = customerDetailsDto.firstName;
    customerDetails.lastName = customerDetailsDto.lastName;
    customerDetails.addressLine1 = customerDetailsDto.addressLine1;
    customerDetails.addressLine2 = customerDetailsDto.addressLine2;
    customerDetails.suburb = customerDetailsDto.suburb;
    customerDetails.postcode = customerDetailsDto.postcode;
    customerDetails.state = customerDetailsDto.state;
    customerDetails.paymentType = customerDetailsDto.paymentType;

    return customerDetails;
  }
}
