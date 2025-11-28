import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import { inject } from '@angular/core';
import { TransactionDto } from '../../services/models';
import { TransactionService } from '../../services/transactions/transaction.service';
import { HelperService } from '../../services/helper/helper.service';

@Component({
  selector: 'app-transactions',
  imports: [
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './transactions.component.html',
  standalone: true,
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements OnInit {

  transactions : Array<TransactionDto> = [];

  private transactionService = inject(TransactionService);
  private helperService = inject(HelperService);

  displayedColumns: string[] = ['date', 'amount', 'iban', 'type'];

  dataSource = new MatTableDataSource<TransactionDto>();

  ngOnInit(): void {
    this.findAllByUserIdTransactions();
  }

  findAllByUserIdTransactions(){
    this.transactionService.findAllByUserId(this.helperService.userId).subscribe({
      next: (res) => {
        this.transactions = res.body ?? [];
        this.dataSource.data = this.transactions;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  
 
}
