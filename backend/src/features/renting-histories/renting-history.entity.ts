import { CustomerDetails } from '@/features/customer-details';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('RENTING_HISTORY')
export class RentingHistory {
  @PrimaryColumn('int')
  id: number;

  @Column({ name: 'CAR_ID', type: 'int' })
  carId: number;

  @Column({ name: 'CUSTOMER_DETAILS_ID', type: 'int' })
  customerDetailsId: number;

  @Column({ name: 'USER_EMAIL', type: 'varchar', length: 255 })
  userEmail: string;

  @Column({ name: 'RENT_DATE', type: 'date' })
  rentDate: Date;

  @Column({ name: 'RETURN_DATE', type: 'date' })
  returnDate: Date;

  @Column({ name: 'BOND_AMOUNT', type: 'int' })
  bondAmount: number;

  @ManyToOne(
    () => CustomerDetails,
    (customerDetails) => customerDetails.rentingHistories,
  )
  @JoinColumn({ name: 'CUSTOMER_DETAILS_ID', referencedColumnName: 'id' })
  customerDetails: CustomerDetails;
}
