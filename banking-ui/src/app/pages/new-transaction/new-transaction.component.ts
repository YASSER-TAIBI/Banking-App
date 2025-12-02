import { Component, inject, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { StatisticService } from '../../services/statistics/statistic.service';
import { TransactionService } from '../../services/transactions/transaction.service';
import { ContactService } from '../../services/contacts/contact.service';
import { HelperService } from '../../services/helper/helper.service';
import { ContactDto, TransactionDto } from '../../services/models';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-transaction',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './new-transaction.component.html',
  standalone: true,
  styleUrl: './new-transaction.component.scss'
})
export class NewTransactionComponent implements OnInit {

  transaction: TransactionDto = {};
  contacts: Array<ContactDto> = [];
  errorMessage: Array<string> = [];
  accountBalance: number = 0;
  
  private statisticService = inject (StatisticService);
  private transactionService = inject(TransactionService);
  private contactService = inject(ContactService);
  private helperService = inject(HelperService);
  private router = inject(Router);

    ngOnInit(): void {
      this.getAccountBalanceUser();
      this.findAllByUserIdContacts();
  }

  findAllByUserIdContacts() {
    this.contactService.findAllByUserId(this.helperService.userId).subscribe({
      next: (res) => {
        this.contacts = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getAccountBalanceUser() {
    this.statisticService.getAccountBalanceUser(this.helperService.userId).subscribe({
      next: (res) => {
        this.accountBalance = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onCancel() {
    this.transaction = {};
    this.contacts = [];
    this.router.navigate(['user/transactions']);
  }

  onSubmit() {
    this.errorMessage = [];
    this.transaction.userId = this.helperService.userId;
    this.transactionService.save(this.transaction).subscribe({
      next: (res) => {
        console.log(res);
        this.transaction = {};
        this.contacts = [];
        this.getAccountBalanceUser();
        this.findAllByUserIdContacts();
      },
      error: (err) => {
                const backendError = err.error;
        if (backendError?.errorMessage) {
            this.errorMessage.push(backendError.errorMessage);
          }
        if (backendError?.validationErrors && Array.isArray(backendError.validationErrors)) {
            this.errorMessage.push(...backendError.validationErrors);
          }
          console.log(err.error);
      }
    });
  }
}
