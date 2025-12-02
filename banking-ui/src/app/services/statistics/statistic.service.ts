import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiConfiguration } from '../api-configuration';
import { getAccountBalance, highestTransaction, highestDeposit, previousLogin, findSumTransactionByDate, findAllSumTransactionByDate } from '../functions';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {


  private http = inject(HttpClient);
  private apiConfig = inject(ApiConfiguration);

  getAccountBalanceUser(userId: number) {
    return getAccountBalance(this.http, this.apiConfig.rootUrl, { 'user-id': userId })
      .pipe(map(res => res.body ?? 0));
  }

  highestTransactionUser(userId: number) {
    return highestTransaction(this.http, this.apiConfig.rootUrl, { 'user-id': userId })
      .pipe(map(res => res.body ?? 0));
  }

  highestDepositUser(userId: number) {
    return highestDeposit(this.http, this.apiConfig.rootUrl, { 'user-id': userId })
      .pipe(map(res => res.body ?? 0));
  }

  findSumTransactionByDateUser(userId: number, startDate: string, endDate: string) {
    return findSumTransactionByDate(this.http, this.apiConfig.rootUrl, { 'user-id': userId, 'start-date': startDate, 'end-date': endDate })
      .pipe(map(res => res.body ?? []));
  }

  findAllSumTransactionByDateUser(userId: number) {
    return findAllSumTransactionByDate(this.http, this.apiConfig.rootUrl, { 'user-id': userId })
      .pipe(map(res => res.body ?? []));
  }

  previousLoginUser(userId: number) {
    return previousLogin(this.http, this.apiConfig.rootUrl, { 'user-id': userId })
      .pipe(map(res => res.body ?? 0));
  }
}
