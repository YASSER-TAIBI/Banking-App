import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MenuComponent} from '../../components/menu/menu.component';

@Component({
  selector: 'app-main-page',
  imports: [
    RouterOutlet,
    MenuComponent
  ],
  templateUrl: './main-page.component.html',
  standalone: true,
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

}
