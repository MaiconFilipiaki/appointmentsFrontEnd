import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { JwtService } from '../serviceCore/jwt.service';
import {Router} from '@angular/router';
import {DashboardService} from './dashboard.service';
import {ModalCreateComponent} from './modal-create/modal-create.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private jwtService: JwtService,
    private dashboardService: DashboardService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void { }

  onAddAppointment(): void {
    const dialogRef = this.dialog.open(ModalCreateComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('DIALOAD RESULT', result);
    });
  }

  onLogout(): void {
    this.jwtService.destroyToken();
    this.router.navigate(['/login']);
  }

}
