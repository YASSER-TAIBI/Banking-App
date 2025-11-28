import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration } from '../api-configuration';
import { findAllByUserId } from '../fn/transaction-controller/find-all-by-user-id';
import { TransactionDto } from '../models';
import { save1 } from '../functions';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private http = inject(HttpClient);
  private apiConfig = inject(ApiConfiguration);

  findAllByUserId(userId: number) {
    return findAllByUserId(this.http, this.apiConfig.rootUrl, { 'user-id': userId });
  }

  save(transaction: TransactionDto) {
    return save1(this.http, this.apiConfig.rootUrl, { body: transaction });
  }
}
