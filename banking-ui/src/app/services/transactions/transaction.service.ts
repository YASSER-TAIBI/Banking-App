import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration } from '../api-configuration';
import { findAllByUserId, save1 } from '../functions';
import { TransactionDto } from '../models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private http = inject(HttpClient);
  private apiConfig = inject(ApiConfiguration);

  findAllByUserId(userId: number) {
    return findAllByUserId(this.http, this.apiConfig.rootUrl, { 'user-id': userId })
      .pipe(map(res => res.body ?? []));
  }

  save(transaction: TransactionDto) {
    return save1(this.http, this.apiConfig.rootUrl, { body: transaction })
      .pipe(map(res => res.body ?? null));
  }
}
