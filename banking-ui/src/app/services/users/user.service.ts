import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration } from '../api-configuration';
import { inject } from '@angular/core';
import { findAll } from '../fn/user-controller/find-all';
import { StrictHttpResponse } from '../strict-http-response';
import { Observable } from 'rxjs';
import { UserDto } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);
  private apiConfig = inject(ApiConfiguration);

  findAllUsers(): Observable<StrictHttpResponse<Array<UserDto>>> {
    return findAll(this.http, this.apiConfig.rootUrl);
  }
}
