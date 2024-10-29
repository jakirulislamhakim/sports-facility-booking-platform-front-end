import { TFacility } from './facility.types';

export type TBookingData = {
  _id: string;
  user: string;
  facility: TFacility;
  startTime: string;
  endTime: string;
  date: string;
  payableAmount: number;
  isBooked: string;
};
