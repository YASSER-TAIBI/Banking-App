import {Component, Input, OnInit} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    RouterLink
  ],
  templateUrl: './menu.component.html',
  standalone: true,
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit{

  @Input() isAdmin = false;
  role = 'user';

  ngOnInit() {
    if(this.isAdmin){
      this.role = 'admin';
    }
  }

}
