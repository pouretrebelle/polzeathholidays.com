export const enum BookingStatus {
  Booked = 'Booked',
  Available = 'Available',
  Pending = 'Pending',
}

export interface Booking {
  date: Date,
  price: number,
  status: BookingStatus
}
