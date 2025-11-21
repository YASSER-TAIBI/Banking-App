import { Component, OnInit } from '@angular/core';
import {MatCard} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { findAll1 } from '../../services/functions';
import { TransactionDto } from '../../services/models/transaction-dto';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';


@Component({
  selector: 'app-user-dashboard',
  imports: [
    FormsModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCard,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule
  ],
  templateUrl: './user-dashboard.component.html',
  standalone: true,
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent implements OnInit {

  startDate = new Date(2023, 0, 1);
  endDate = new Date(2023, 0, 1);

  // adapte l'URL si besoin (environment.apiUrl par ex.)
  private readonly API_ROOT_URL = 'http://localhost:8080';

  private http = inject(HttpClient);

  ngOnInit(): void {
    this.loadAllTransactions();
  }

  private loadAllTransactions(): void {
  findAll1(this.http, this.API_ROOT_URL, {})
    .subscribe({
      next: async (response) => {
        // la réponse brute est un Blob
        const blob = response.body as unknown as Blob;

        // convertir le Blob en texte
        const text = await blob.text();

        // parser le JSON en tableau de TransactionDto
        const transactions: TransactionDto[] = JSON.parse(text);

        console.log('Toutes les transactions :', transactions);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des transactions', err);
      }
    });
}
}
