import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

interface Contact {
  firstName: string;
  lastName: string;
  email: string;
  iban: string;
}

@Component({
  selector: 'app-contacts',
  imports: [
    MatButtonModule, 
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './contacts.component.html',
  standalone: true,
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'iban', 'actions'];

  contacts: Contact[] = [
    { firstName: 'John', lastName: 'Doe', email: 'exemple@gmail.com', iban: 'FR12 1234 3456 3456 3455 00' },
    { firstName: 'John', lastName: 'Doe', email: 'exemple@gmail.com', iban: 'FR12 1234 3456 3456 3455 00' },
    { firstName: 'John', lastName: 'Doe', email: 'exemple@gmail.com', iban: 'FR12 1234 3456 3456 3455 00' },
    { firstName: 'John', lastName: 'Doe', email: 'exemple@gmail.com', iban: 'FR12 1234 3456 3456 3455 00' },
    { firstName: 'John', lastName: 'Doe', email: 'exemple@gmail.com', iban: 'FR12 1234 3456 3456 3455 00' },
    { firstName: 'John', lastName: 'Doe', email: 'exemple@gmail.com', iban: 'FR12 1234 3456 3456 3455 00' },
    { firstName: 'John', lastName: 'Doe', email: 'exemple@gmail.com', iban: 'FR12 1234 3456 3456 3455 00' },
    { firstName: 'John', lastName: 'Doe', email: 'exemple@gmail.com', iban: 'FR12 1234 3456 3456 3455 00' },
    { firstName: 'John', lastName: 'Doe', email: 'exemple@gmail.com', iban: 'FR12 1234 3456 3456 3455 00' }
  ]

  dataSource = new MatTableDataSource<Contact>(this.contacts);

  onNewContact() {
    // tu ajouteras plus tard l’ouverture d’un dialog ou la navigation vers une page de création
    console.log('New contact clicked');
  }

  onEditContact(contact: Contact) {
    console.log('Edit contact', contact);
  }

  onDeleteContact(contact: Contact) {
    console.log('Delete contact', contact);
  }
}
