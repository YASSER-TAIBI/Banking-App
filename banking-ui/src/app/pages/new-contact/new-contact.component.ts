import { Component, inject, OnInit } from '@angular/core';import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ContactDto } from '../../services/models';
import { ContactService } from '../../services/contacts/contact.service';
import { HelperService } from '../../services/helper/helper.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-contact',
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './new-contact.component.html',
  standalone: true,
  styleUrl: './new-contact.component.scss'
})
export class NewContactComponent implements OnInit {

  contact: ContactDto = {
  firstName: '',
  lastName: '',
  email: '',
  iban: '',
  userId: undefined
  };
  errorMessage: Array<string> = [];
  
  private contactService = inject(ContactService);
  private helperService = inject(HelperService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  
  ngOnInit(): void {
    const contactId = this.activatedRoute.snapshot.params['idContact'];
   if(contactId){
    this.contactService.findById(contactId).subscribe({
      next: (res) => {
        this.contact = res.body;
      },
      error: (err) => {
        console.log(err);
      }
    })
   }
  }

  onSubmit() {
    this.errorMessage = [];
    this.contact.userId = this.helperService.userId;
    this.contactService.save(this.contact).subscribe({
      next: (res) => {
        console.log(res);
        this.contact = this.initContact();
        this.router.navigate(['user/contacts']);
      },
      error: (err) => {
        const backendError = err.error;
        if (backendError?.errorMessage) {
            this.errorMessage.push(backendError.errorMessage);
          }
        if (backendError?.validationErrors && Array.isArray(backendError.validationErrors)) {
            this.errorMessage.push(...backendError.validationErrors);
          }
          console.log(err);
      }
    });
  }

  onCancel() {
    this.contact = this.initContact();
    this.router.navigate(['user/contacts']);
  }

  private initContact(): ContactDto {
  return {
    firstName: '',
    lastName: '',
    email: '',
    iban: '',
    userId: undefined
  };
}

}
