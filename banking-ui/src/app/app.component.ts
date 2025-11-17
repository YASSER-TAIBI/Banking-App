import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MenuComponent} from './components/menu/menu.component';
import {UserDashboardComponent} from './pages/user-dashboard/user-dashboard.component';
import {TransactionsComponent} from './pages/transactions/transactions.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSlideToggleModule, UserDashboardComponent, MenuComponent, TransactionsComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'banking-ui';
}
