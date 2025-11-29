import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/users/user.service';
import { UserDto } from '../../services/models';

@Component({
  selector: 'app-manage-users',
  imports: [
    MatButtonModule,
    MatTableModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatIconModule,
    MatDialogModule,
    RouterLink,
  ],
  templateUrl: './manage-users.component.html',
  standalone: true,
  styleUrl: './manage-users.component.scss'
})
export class ManageUsersComponent implements OnInit {

  users: Array<UserDto> = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'iban', 'state', 'actions'];
  dataSource = new MatTableDataSource<UserDto>();
  showInactiveOnly = false;

  private userService = inject(UserService);


  ngOnInit(): void {
    this.findAllUsers();
  }

  findAllUsers() {
    this.userService.findAllUsers().subscribe({
      next: (res) => {
        this.users = res.body ?? [];
        this.dataSource.data = this.users;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  onToggleInactive(checked: boolean) {
    this.showInactiveOnly = checked;
    this.dataSource.data = checked
      ? this.users.filter(u => u.active === false)
      : this.users;
  }
}
