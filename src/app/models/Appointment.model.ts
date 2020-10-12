 import { User } from './user.model';

 export interface Appointment {
  id: string;
  medic: User;
  customer: User;
  dateAppointment: string;
}
