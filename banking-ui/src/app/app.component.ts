import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MenuComponent} from './components/menu/menu.component';
import {UserDashboardComponent} from './pages/user-dashboard/user-dashboard.component';
import {TransactionsComponent} from './pages/transactions/transactions.component';
import {ContactsComponent} from './pages/contacts/contacts.component';
import {NewTransactionComponent} from './pages/new-transaction/new-transaction.component';
import {NewContactComponent} from './pages/new-contact/new-contact.component';
import {ProfileComponent} from './pages/profile/profile.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    MatSlideToggleModule, 
    UserDashboardComponent, 
    MenuComponent, 
    TransactionsComponent, 
    ContactsComponent, 
    NewTransactionComponent, 
    NewContactComponent, 
    ProfileComponent
  ],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'banking-ui';
}
