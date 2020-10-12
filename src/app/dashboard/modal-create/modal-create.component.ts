import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

import {DashboardService} from '../dashboard.service';
import { User } from '../../models/user.model';
import { UserTypeEnum } from '../../models/enum/userType.enum';
import {AppointmentCreate} from '../../models/AppointmentCreate.model';

@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.scss']
})
export class ModalCreateComponent implements OnInit {

  public listOfMedic: User[] = [];
  public listOfCustomer: User[] = [];
  public createForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      medic: [null, [Validators.required]],
      customer: [null, [Validators.required]],
      date: [null, [Validators.required]],
    });
    this.dashboardService.getAllUsers()
      .subscribe(value => {
        this.listOfCustomer = value.filter(i => i.type === UserTypeEnum.CUSTOMER);
        this.listOfMedic = value.filter(i => i.type === UserTypeEnum.MEDIC);
      });
  }
  onSubmit(): void {
    const {date, medic, customer} = this.createForm.value;
    const dateApi = `
    ${formatDate(date, 'yyyy-MM-dd HH:mm:SS', 'pt-BR')
      .replace(' ', 'T')}.000-03:00`;
    const newAppointment: AppointmentCreate = {
      idMedic: medic,
      idCustomer: customer,
      dateAppointment: dateApi
    };
    this.dashboardService.createAppointment(newAppointment)
      .subscribe((value => console.log('VALUE', value)));
  }
}
