import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {LINK_SERVER} from '../../constantes';
import { Credentials } from '../models/credentials.model';
import { JwtService } from '../serviceCore/jwt.service';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    private jwtService: JwtService
  ) { }

  login(credentials: Credentials): void {
    this.http.post<any>(`${LINK_SERVER}login`, credentials, {observe: 'response'})
      .subscribe(resp => {
        const token = resp?.headers.get('Authorization');
        this.jwtService.saveToken(token);
    });
  }

  createUser(user: User): void {
    this.http.post(`${LINK_SERVER}register`, user)
      .subscribe((data: User) => {
        return data;
      });
  }

  isAuth(): boolean {
    const teste: string = this.jwtService.getToken();
    if (teste) {
      return true;
    }
    return false;
  }

}
