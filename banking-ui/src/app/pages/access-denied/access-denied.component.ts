import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-access-denied',
  imports: [
    MatCardModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './access-denied.component.html',
  standalone: true,
  styleUrl: './access-denied.component.scss'
})
export class AccessDeniedComponent {

}
