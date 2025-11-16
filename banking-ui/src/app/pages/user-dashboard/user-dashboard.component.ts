import { Component } from '@angular/core';
import {MatCard} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-user-dashboard',
  imports: [
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCard
  ],
  templateUrl: './user-dashboard.component.html',
  standalone: true,
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent {

}
