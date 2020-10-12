import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Appointment } from '../models/Appointment.model';

import { LINK_SERVER } from '../../constantes';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../models/user.model';
import {AppointmentCreate} from '../models/AppointmentCreate.model';

@Injectable()
export class DashboardService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllAppointment(): Observable<Appointment[]> {
    return this.httpClient.get(`${LINK_SERVER}appointment`)
      .pipe(map((data: Appointment[]) => data));
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get(`${LINK_SERVER}user`)
      .pipe(map((data: User[]) => data));
  }

  createAppointment(newAppointment: AppointmentCreate): Observable<Appointment> {
    return this.httpClient
      .post(`${LINK_SERVER}appointment`, newAppointment)
      .pipe(map((data: Appointment) => data));
  }

}
