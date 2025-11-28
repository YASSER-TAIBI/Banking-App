import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {Router, RouterLink} from '@angular/router';
import { ContactDto } from '../../services/models';
import { ContactService } from '../../services/contacts/contact.service';
import { HelperService } from '../../services/helper/helper.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-contacts',
  imports: [
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    RouterLink,
    MatDialogModule
  ],
  templateUrl: './contacts.component.html',
  standalone: true,
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent implements OnInit {

  contacts: Array<ContactDto> = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'iban', 'actions'];
  dataSource = new MatTableDataSource<ContactDto>();

  private contactService = inject(ContactService);
  private helperService = inject(HelperService);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  
  // contact sélectionné pour suppression
  selectedContact?: ContactDto;

  // référence au template du dialog
  @ViewChild('deleteDialog') deleteDialog!: TemplateRef<any>;


  ngOnInit(): void {
    this.findAllByUserIdContacts();
  }

  findAllByUserIdContacts() {
    this.contactService.findAllByUserId(this.helperService.userId).subscribe({
      next: (res) => {
        this.contacts = res.body ?? [];
        this.dataSource.data = this.contacts;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onEditContact(contactId: number | undefined) {
    console.log('Edit contact', contactId);
    this.router.navigate(['user/new-contact', contactId]);
  }

  // ouverture du dialog
  openDeleteDialog(contact: ContactDto): void {
    this.selectedContact = contact;
    this.dialog.open(this.deleteDialog);
  }

  // confirmé par l’utilisateur
  confirmDelete(): void {
    if (!this.selectedContact?.id) {
      return;
    }
    console.log('Delete contact', this.selectedContact.id);
    this.contactService.delete(this.selectedContact.id).subscribe({
      next: () => {
        this.findAllByUserIdContacts();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
