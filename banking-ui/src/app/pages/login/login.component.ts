import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationRequest } from '../../services/models';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authRequest: AuthenticationRequest = {};
  errorMessage: Array<string> = [];

  private authService = inject(AuthService);
  private router = inject(Router);

  login(){
    this.errorMessage = [];
   this.authService.login(this.authRequest)
    .subscribe({
      next: (res) => {
        localStorage.setItem('token', res.body.token as string);
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(res.body.token as string);
        if (decodedToken.authorities[0].authority === 'ROLE_USER'){
          this.router.navigate(['user/dashboard']);
          console.log(decodedToken);
        }else{
          this.router.navigate(['admin/dashboard']);
          console.log(decodedToken);
        }
      },
      error: (err) => {
        // err.error correspond au body JSON de ExceptionRepresentation
        const backendError = err.error;
        // message global (par ex. "Object not valid exception has occured")
        if (backendError?.errorMessage) {
          this.errorMessage.push(backendError.errorMessage);
        }
      }
    });
  }
}
