import { BookingForm } from '@/features/RentingHistory';

import axios from './config';

export async function placeBooking(bookingForm: BookingForm) {
  return axios.post('/renting-histories', refineBookingForm(bookingForm));
}

export async function calculateBondAmount(email: string) {
  return axios.get<number>('/renting-histories/bond-amount', {
    params: { email },
  });
}

function refineBookingForm(bookingForm: BookingForm) {
  const rentDate = new Date();
  const rentingHistories = bookingForm.cartItems.map((item) => ({
    carId: item.id,
    rentDate: rentDate.toISOString().slice(0, 10),
    returnDate: calculateReturnDate(rentDate, item.rentalDays)
      .toISOString()
      .slice(0, 10),
  }));

  return {
    rentingHistories,
    customerDetails: bookingForm.customerDetails,
    bondAmount: bookingForm.bondAmount,
  };
}

function calculateReturnDate(rentDate: Date, rentalDays: number) {
  return new Date(rentDate.getTime() + rentalDays * 24 * 60 * 60 * 1000);
}
