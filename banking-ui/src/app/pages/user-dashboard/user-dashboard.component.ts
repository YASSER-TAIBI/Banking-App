import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { StatisticService } from '../../services/statistics/statistic.service';
import { HelperService } from '../../services/helper/helper.service';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType, ChartOptions, ChartDataset } from 'chart.js';
import { TransactionSumDetails } from '../../services/models';

@Component({
  selector: 'app-user-dashboard',
  imports: [
    CommonModule,
    FormsModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BaseChartDirective
  ],
  templateUrl: './user-dashboard.component.html',
  standalone: true,
  styleUrl: './user-dashboard.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDashboardComponent implements OnInit{

   accountBalance: number = 0;
   highestTransaction: number = 0;
   highestDeposit: number = 0;
   previousLogin: Date | null = null;

   chartType: ChartType = 'line';
   chartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: [],
  };
    chartOptions: ChartOptions = {
     responsive: true,
     plugins: {
       legend: {
         position: 'bottom',
         labels:{
           usePointStyle: true,
           boxWidth: 12,
           boxHeight: 12,
           padding: 10,
           font: {
             size: 14,
             family: 'Roboto',
             weight: 'bolder'
           }
         }
       },
       title: {
         display: true,
         text: 'La somme des transactions par jour',
         font: {
           size: 18,
           family: 'Roboto',
           weight: 'bold',
         },
         color: '#c2185b',
       },
     },
   };

  private statisticService = inject(StatisticService);
  private helperService = inject(HelperService)

  startDate: Date | null = null;
  endDate: Date | null = null;

    ngOnInit(): void {
      this.accountInfos();
      this.getChartAllTransactionByDate();
  }

  accountInfos(){
    this.statisticService.getAccountBalanceUser(this.helperService.userId)
    .subscribe({
      next: (res) => {
        this.accountBalance = res;
      }
    });

    this.statisticService.highestTransactionUser(this.helperService.userId)
    .subscribe({
      next: (res) => {
        this.highestTransaction = res;
      }
    });

    this.statisticService.highestDepositUser(this.helperService.userId)
    .subscribe({
      next: (res) => {
        this.highestDeposit = res;
      }
    });

    this.statisticService.previousLoginUser(this.helperService.userId)
    .subscribe({
      next: (res) => {
        if (res) {
        this.previousLogin = new Date(res);  // conversion string to Date
      } else {
        this.previousLogin = null;
      }
      }
    });
  }

getChartAllTransactionByDate() {
  this.statisticService.findAllSumTransactionByDateUser(this.helperService.userId)
    .subscribe({
      next: (res: TransactionSumDetails[]) => this.updateChartFromResponse(res),
      error: (err) => console.error('Erreur chargement graphique global', err),
    });
}

getChartTransactionFilteredByDate() {
   if (!this.startDate || !this.endDate) {
    alert('Veuillez sélectionner une date de début et une date de fin');
    return;
  }

  if (this.startDate > this.endDate) {
    alert('La date de début doit être inférieure à la date de fin');
    return;
  }

  const startIso = this.startDate.toISOString().split('T')[0]; // yyyy-MM-dd
  const endIso   = this.endDate.toISOString().split('T')[0];   // yyyy-MM-dd

  this.statisticService.findSumTransactionByDateUser(this.helperService.userId, startIso, endIso)
    .subscribe({
      next: (res: TransactionSumDetails[]) => this.updateChartFromResponse(res),
      error: (err) => console.error('Erreur chargement graphique filtré', err),
    });
}

private updateChartFromResponse(res: TransactionSumDetails[]): void {
  const labels = res.map(r => r.transactionDate ?? '');
  const dataValues = res.map(r => r.amount ?? 0);

  this.chartData = {
    labels,
    datasets: [
      {
        data: dataValues,
        label: 'Montant total par jour',
        fill: false,
        tension: 0.4,
        borderColor: 'rgba(75, 122, 192, 1)',
        backgroundColor: 'rgba(75, 106, 192, 0.2)',
      }
    ]
  };
}
}