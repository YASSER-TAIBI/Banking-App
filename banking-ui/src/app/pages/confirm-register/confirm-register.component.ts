import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-confirm-register',
  imports: [
    MatCardModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './confirm-register.component.html',
  styleUrl: './confirm-register.component.scss'
})
export class ConfirmRegisterComponent {

}
