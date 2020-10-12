import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserTypeEnum } from '../../models/enum/userType.enum';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  public createForm: FormGroup;

  public typeUser: Array<any> = [
    { value: UserTypeEnum.MEDIC, label: UserTypeEnum.MEDIC },
    { value: UserTypeEnum.CUSTOMER, label: UserTypeEnum.CUSTOMER },
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    console.log(UserTypeEnum[UserTypeEnum.MEDIC], UserTypeEnum.MEDIC);
    this.createForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      name: [null, [Validators.required]],
      type: [null, [Validators.required]]
    });
  }

  onSubmit(): void {
    const user = this.createForm.value;
    this.authService.createUser(user);
  }

}
