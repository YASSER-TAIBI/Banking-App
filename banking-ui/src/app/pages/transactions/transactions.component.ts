import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {RouterLink} from '@angular/router';

interface Transaction {
  date: string;
  amount: string;
  iban: string;
  type: 'Transfer' | 'Deposit';
}

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
export class TransactionsComponent {

  displayedColumns: string[] = ['date', 'amount', 'iban', 'type'];

  transactions: Transaction[] = [
    { date: '01/01/2023', amount: '1 560€', iban: 'DE12 1234 3456 3456 3455 00', type: 'Transfer' },
    { date: '01/01/2023', amount: '1 560€', iban: 'DE12 1234 3456 3456 3455 00', type: 'Deposit' },
    { date: '01/01/2023', amount: '1 560€', iban: 'DE12 1234 3456 3456 3455 00', type: 'Transfer' },
    { date: '01/01/2023', amount: '1 560€', iban: 'DE12 1234 3456 3456 3455 00', type: 'Transfer' },
    { date: '01/01/2023', amount: '1 560€', iban: 'DE12 1234 3456 3456 3455 00', type: 'Deposit' },
    { date: '01/01/2023', amount: '1 560€', iban: 'DE12 1234 3456 3456 3455 00', type: 'Transfer' },
    { date: '01/01/2023', amount: '1 560€', iban: 'DE12 1234 3456 3456 3455 00', type: 'Deposit' },
    { date: '01/01/2023', amount: '1 560€', iban: 'DE12 1234 3456 3456 3455 00', type: 'Transfer' },
    { date: '01/01/2023', amount: '1 560€', iban: 'DE12 1234 3456 3456 3455 00', type: 'Transfer' }
  ];

  dataSource = new MatTableDataSource<Transaction>(this.transactions);

}
