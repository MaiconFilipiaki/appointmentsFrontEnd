 import { User } from './user.model';

 export interface AppointmentCreate {
  idMedic: number;
  idCustomer: number;
  dateAppointment: string;
}
