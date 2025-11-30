import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration } from '../api-configuration';
import { inject } from '@angular/core';
import { findAll, invalidateAccount, validateAccount } from '../functions';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);
  private apiConfig = inject(ApiConfiguration);

  findAllUsers() {
    return findAll(this.http, this.apiConfig.rootUrl);
  }

  validateAccountUser(id: number) {
    return validateAccount(this.http, this.apiConfig.rootUrl, { 'user-id': id });
  }

  invalidateAccountUser(id: number) {
    return invalidateAccount(this.http, this.apiConfig.rootUrl, { 'user-id': id });
  }
}
