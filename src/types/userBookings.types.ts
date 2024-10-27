import { TFacility } from "./facility.types";

export interface BookingData {
    _id: string;
    user: string;
    facility: TFacility;
    startTime: string;
    endTime: string;
    date: string;
    payableAmount: number;
    isBooked: string;
  }
  