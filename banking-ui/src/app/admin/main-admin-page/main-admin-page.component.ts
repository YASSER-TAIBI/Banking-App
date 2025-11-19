import { Component } from '@angular/core';
import {MenuComponent} from '../../components/menu/menu.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-main-admin-page',
  imports: [
    MenuComponent,
    RouterOutlet
  ],
  templateUrl: './main-admin-page.component.html',
  standalone: true,
  styleUrl: './main-admin-page.component.scss'
})
export class MainAdminPageComponent {

}
