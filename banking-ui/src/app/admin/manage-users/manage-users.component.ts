import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserService } from '../../services/users/user.service';
import { UserDto } from '../../services/models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-users',
  imports: [
    MatButtonModule,
    MatTableModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    MatDialogModule
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
  private dialog = inject(MatDialog);

   // user sélectionné pour changement d'état
    selectedUser?: UserDto;

    // référence au template du dialog
    @ViewChild('actInactDialog') actInactDialog!: TemplateRef<any>;

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

  openActiveInactiveDialog(user: UserDto) {
    this.selectedUser = user;
    this.dialog.open(this.actInactDialog);
  }

  confirmChangeState(){
    if(this.selectedUser?.active && this.selectedUser?.id) {
      this.userService.validateAccountUser(this.selectedUser.id).subscribe({
        next: () => {
          this.findAllUsers();
        },
        error: (err) => {
          console.log(err);
        }
      });
    } else if (!this.selectedUser?.active && this.selectedUser?.id) {
      this.userService.invalidateAccountUser(this.selectedUser.id).subscribe({
        next: () => {
          this.findAllUsers();
        },
        error: (err) => {
          console.log(err);
        }
      });
    } else {
      console.log('User is not active or id is not defined');
    }
  }

  cancelChangeState(){
    this.findAllUsers();
    this.dialog.closeAll();
  }
}
