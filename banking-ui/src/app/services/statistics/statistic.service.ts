import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiConfiguration } from '../api-configuration';
import { getAccountBalance } from '../functions';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {


  private http = inject(HttpClient);
  private apiConfig = inject(ApiConfiguration);

  getAccountBalanceUser(userId: number) {
    return getAccountBalance(this.http, this.apiConfig.rootUrl, { 'user-id': userId });
  }
}
