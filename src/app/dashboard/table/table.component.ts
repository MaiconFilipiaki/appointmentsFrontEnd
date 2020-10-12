import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

import { DashboardService } from '../dashboard.service';
import {Appointment} from '../../models/Appointment.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  displayedColumns: string[] = ['medicName', 'customerName', 'dateFormatted'];

  public listAppointment: Appointment[] = [];

  constructor(
    private dashboardService: DashboardService,
  ) { }

  ngOnInit(): void {
    this.dashboardService
      .getAllAppointment()
      .subscribe((value: Appointment[]) => {
        this.listAppointment = value.map((i) => {
          return {
            ...i,
            medicName: i.medic.name,
            customerName: i.customer.name,
            dateFormatted: formatDate(i.dateAppointment, 'dd/MM/yyyy HH:mm:SS', 'pt-BR')
          };
        });
      });
  }

}
