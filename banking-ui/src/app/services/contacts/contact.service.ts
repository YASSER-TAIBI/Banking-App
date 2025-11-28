import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiConfiguration } from '../api-configuration';
import { delete2, findAllByUserId1, findById2, save2 } from '../functions';
import { ContactDto } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private http = inject(HttpClient);
  private apiConfig = inject(ApiConfiguration);

  findAllByUserId(userId: number) {
    return findAllByUserId1(this.http, this.apiConfig.rootUrl, { 'user-id': userId });
  }

  save(contact: ContactDto) {
    return save2(this.http, this.apiConfig.rootUrl, { body: contact });
  }

  findById(contactId: number) {
    return findById2(this.http, this.apiConfig.rootUrl, { 'contact-id': contactId });
  }

  delete(contactId: number) {
    return delete2(this.http, this.apiConfig.rootUrl, { 'contact-id': contactId });
  }
}
