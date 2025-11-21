import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = `eyJhbGciOiJIUzI1NiJ9.eyJmdWxsTmFtZSI6Inlhc3NlciB0YWliaSIsInVzZXJJZCI6MjAyLCJzdWIiOiJ5YXNzZXJAZ21haWwiLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9VU0VSIn1dLCJpYXQiOjE3NjM3NTM3MDQsImV4cCI6MTc2NDQ3MzcwNH0.R7jYdtGC_q1V2RQSVxZr5hgh9z2G_W06TVKNudhw7gI`;
    if (token !== undefined && token !== null) {
      // assign the token
      const authReq = req.clone({
        headers: new HttpHeaders({
          Authorization: `Bearer ` + token
        })
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
