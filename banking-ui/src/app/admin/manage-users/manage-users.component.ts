import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-manage-users',
  imports: [
    MatTableModule,
    MatSlideToggleModule,
    MatCheckboxModule
  ],
  templateUrl: './manage-users.component.html',
  standalone: true,
  styleUrl: './manage-users.component.scss'
})
export class ManageUsersComponent {

  displayedColumns: string[] = ['firstName', 'lastName', 'iban', 'state', 'actions'];

    users = [
    { firstName: 'John', lastName: 'Doe', iban: 'FR12 1234 3456 3456 3455 00', state: 'active',   active: true  },
    { firstName: 'John', lastName: 'Doe', iban: 'FR12 1234 3456 3456 3455 00', state: 'inactive', active: false },
    { firstName: 'John', lastName: 'Doe', iban: 'FR12 1234 3456 3456 3455 00', state: 'active',   active: true  },
    // ... dupliquer pour remplir le tableau
  ];

  dataSource = new MatTableDataSource(this.users);

  showInactiveOnly = false;

  onToggleInactive(checked: boolean) {
    this.showInactiveOnly = checked;
    this.dataSource.data = checked
      ? this.users.filter(u => u.state === 'inactive')
      : this.users;
  }
}
