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
  ],
  templateUrl: './user-dashboard.component.html',
  standalone: true,
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent {

  startDate = new Date(2023, 0, 1);
  endDate = new Date(2023, 0, 1);
}
